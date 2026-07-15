import type { SelectionManager } from "./SelectionManager";
import type { ResizeManager } from "./ResizeManager";
import type { EditManager } from "./EditManager";
import type { CommandManager } from "../commands/CommandManager";
import type { ViewPort } from "../utils/ViewPort";
import type { DataStore } from "../utils/DataStore";
import type { CoordinateManager } from "./CoordinateManager";
import { Constants } from "../utils/Constants";
import { ResizeType } from "../models/ResizeState";
import type { ScrollBarManager } from "./ScrollBarManager";

export class MouseManager {
    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly datastore: DataStore,
        private readonly viewport: ViewPort,
        private readonly selectionManager: SelectionManager,
        private readonly resizeManager: ResizeManager,
        private readonly editManager: EditManager,
        private readonly commandManager: CommandManager,
        private readonly coordManager: CoordinateManager,
        private readonly scrollBarManager:ScrollBarManager,
        private readonly render: () => void
    ) {
        this.initEvents();
    }

    private initEvents(): void {
        this.canvas.addEventListener("wheel", this.handleWheel.bind(this), { passive: false });
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("dblclick", this.handleDblClick.bind(this));
    }

    private handleWheel(event: WheelEvent): void {
        event.preventDefault();
        const newX = this.viewport.getScrollX() + event.deltaX;
        const newY = this.viewport.getScrollY() + event.deltaY;

        const maxScrollX = this.datastore.getTotalWidth() - (this.canvas.width - Constants.HEADER_WIDTH);
        const maxScrollY = this.datastore.getTotalHeight() - (this.canvas.height - Constants.HEADER_HEIGHT);

        const boundedX = Math.min(Math.max(0, newX), Math.max(0, maxScrollX));
        const boundedY = Math.min(Math.max(0, newY), Math.max(0, maxScrollY));

        this.viewport.setScroll(boundedX, boundedY);
        this.editManager.updatePosition(boundedX, boundedY);
        this.render();
    }

    private handleMouseDown(event: MouseEvent): void {
        if(this.scrollBarManager.mouseDown(event.offsetX,event.offsetY))
        {
            this.render();
            return;
        }
        const resizeColumn = this.resizeManager.detectColumnResize(
            event.offsetX,
            this.viewport.getScrollX()
        );

        if (resizeColumn !== -1 && event.offsetY <= Constants.HEADER_HEIGHT) {
            this.resizeManager.startColumnResize(resizeColumn, event.offsetX);
            return;
        }

        const resizeRow = this.resizeManager.detectRowResize(
            event.offsetY,
            this.viewport.getScrollY()
        );

        if (resizeRow !== -1 && event.offsetX <= Constants.HEADER_WIDTH) {
            this.resizeManager.startRowResize(resizeRow, event.offsetY);
            return;
        }

        const isRowHeaderClick = event.offsetX < Constants.HEADER_WIDTH && event.offsetY >= Constants.HEADER_HEIGHT;
        const isColHeaderClick = event.offsetY < Constants.HEADER_HEIGHT && event.offsetX >= Constants.HEADER_WIDTH;

        if (isRowHeaderClick) {
            const row = this.coordManager.getRowFromY(event.offsetY);
            if (row >= 0) {
                this.selectionManager.selectRow(row);
                this.render();
            }
            return;
        }

        if (isColHeaderClick) {
            const column = this.coordManager.getColumnFromX(event.offsetX);
            if (column >= 0) {
                this.selectionManager.selectColumn(column);
                this.render();
            }
            return;
        }

        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row >= 0 && column >= 0) {
            this.selectionManager.startSelection(row, column);
            this.render();
        }
    }

    private handleMouseMove(event: MouseEvent): void {
        if(this.scrollBarManager.isDragging())
        {
            this.scrollBarManager.mouseMove(event.offsetX,event.offsetY);
            this.render();
            return;
        }
        if (this.resizeManager.isResizing()) {
            if (this.resizeManager.getState().type === ResizeType.Column) {
                this.canvas.style.cursor = "ew-resize";
                this.resizeManager.updateColumnResize(event.offsetX);
            } else {
                this.canvas.style.cursor = "ns-resize";
                this.resizeManager.updateRowResize(event.offsetY);
            }
            this.render();
            return;
        }

        const resizeColumn = this.resizeManager.detectColumnResize(
            event.offsetX,
            this.viewport.getScrollX()
        );

        const resizeRow = this.resizeManager.detectRowResize(
            event.offsetY,
            this.viewport.getScrollY()
        );

        if (resizeColumn !== -1 && event.offsetY <= Constants.HEADER_HEIGHT) {
            this.canvas.style.cursor = "ew-resize";
        } else if (resizeRow !== -1 && event.offsetX <= Constants.HEADER_WIDTH) {
            this.canvas.style.cursor = "ns-resize";
        } else {
            this.canvas.style.cursor = "default";
        }


        if ((event.buttons & 1) === 0) {
            return;
        }

        const selection = this.selectionManager.getSelection();
        if (selection.selectedRow !== -1 || selection.selectedColumn !== -1) {
            return;
        }

        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row >= 0 && column >= 0) {
            this.selectionManager.updateSelection(row, column);
            this.render();
        }
    }

    private handleMouseUp(): void {
        this.scrollBarManager.mouseUp();
        this.selectionManager.finishSelection();
        this.resizeManager.finishResize((cmd) => {
            this.commandManager.pushExecutedCommand(cmd);
        });
        this.canvas.style.cursor = "default";
        this.render();
    }

    private handleDblClick(event: MouseEvent): void {
        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row < 0 || column < 0) {
            return;
        }

        const left = this.datastore.getColumnOffset(column) - this.viewport.getScrollX();
        const top = this.datastore.getRowOffset(row) - this.viewport.getScrollY();
        this.editManager.startEditing(row, column, left, top, this.datastore.getColumnWidth(column), this.datastore.getRowHeight(row));
    }
}
