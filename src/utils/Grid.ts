import { Constants } from "./Constants";
import type { DataStore } from "./DataStore";
import type { ViewPort } from "./ViewPort";
import { Renderer } from "./Renderer";
import { SelectionManager } from "../managers/SelectionManager";
import { EditManager } from "../managers/EditManager";
import { ResizeManager } from "../managers/ResizeManager";
import { ResizeState, ResizeType } from "../models/ResizeState";
import { CommandHistory } from "../commands/CommandHistory";
import { FormulaBarManager } from "../managers/FormulaBarManager";

export class Grid {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private renderer: Renderer;
    private readonly selectionManager: SelectionManager;
    private editManager: EditManager;
    private resizeManager: ResizeManager;
    private commandHistory: CommandHistory;
    private formulaBarManager: FormulaBarManager;

    constructor(private datastore: DataStore, private viewport: ViewPort, canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;
        this.commandHistory = new CommandHistory();
        const canvasContainer = canvasElement.parentElement || document.body;
        this.editManager = new EditManager(canvasContainer, this.datastore, this.commandHistory, () => this.render());
        this.resizeManager = new ResizeManager(this.datastore);
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Could not obtain 2D rendering context.");
        }
        this.ctx = context;
        this.selectionManager = new SelectionManager();
        this.renderer = new Renderer(this.ctx, this.canvas, this.datastore, this.viewport, this.selectionManager);
        this.formulaBarManager = new FormulaBarManager(
            this.datastore,
            this.selectionManager,
            this.commandHistory,
            () => this.render()
        )
        this.initEvents();
        this.resizeCanvas();
    }

    private resizeCanvas(): void {
        this.canvas.width = this.canvas.clientWidth || window.innerWidth;
        this.canvas.height = this.canvas.clientHeight || window.innerHeight;
        this.render();
    }

    private initEvents(): void {
        window.addEventListener("resize", () => this.resizeCanvas());

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (document.activeElement?.tagName === "INPUT") {
                return;
            }

            if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
                if (event.key.toLowerCase() === "z") {
                    event.preventDefault();
                    this.commandHistory.undo();
                    this.render();
                } else if (event.key.toLowerCase() === "y") {
                    event.preventDefault();
                    this.commandHistory.redo();
                    this.render();
                }
            } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "z") {
                event.preventDefault();
                this.commandHistory.redo();
                this.render();
            }
        });

        this.canvas.addEventListener("wheel", (event: WheelEvent) => {
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
        }, { passive: false });

        this.canvas.addEventListener("mousedown", (event) => {
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
                const row = this.getRowFromY(event.offsetY);
                if (row >= 0) {
                    this.selectionManager.selectRow(row);
                    this.render();
                }
                return;
            }

            if (isColHeaderClick) {
                const column = this.getColumnFromX(event.offsetX);
                if (column >= 0) {
                    this.selectionManager.selectColumn(column);
                    this.render();
                }
                return;
            }

            const row = this.getRowFromY(event.offsetY);
            const column = this.getColumnFromX(event.offsetX);

            if (row >= 0 && column >= 0) {
                this.selectionManager.startSelection(row, column);
                this.render();
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
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

            const row = this.getRowFromY(event.offsetY);
            const column = this.getColumnFromX(event.offsetX);

            if (row >= 0 && column >= 0) {
                this.selectionManager.updateSelection(row, column);
                this.render();
            }
        });


        this.canvas.addEventListener("mouseup", () => {
            this.selectionManager.finishSelection();
            this.resizeManager.finishResize((cmd) => {
                this.commandHistory.pushExecutedCommand(cmd);
            });
            this.canvas.style.cursor = "default";
            this.render();
        });

        this.canvas.addEventListener("dblclick",
            (event) => {
                const row = this.getRowFromY(event.offsetY);
                const column = this.getColumnFromX(event.offsetX);

                if (row < 0 || column < 0) {
                    return;
                }

                const left = this.datastore.getColumnOffset(column) - this.viewport.getScrollX();
                const top = this.datastore.getRowOffset(row) - this.viewport.getScrollY();
                this.editManager.startEditing(row, column, left, top, this.datastore.getColumnWidth(column), this.datastore.getRowHeight(row));
            });
    }

    private getColumnFromX(mouseX: number): number {
        const absX = mouseX + this.viewport.getScrollX();
        if (absX < Constants.HEADER_WIDTH) return -1;

        let low = 0;
        let high = Constants.TOTAL_COLUMNS - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            const startX = this.datastore.getColumnOffset(mid);
            const endX = startX + this.datastore.getColumnWidth(mid);
            if (absX >= startX && absX < endX) {
                return mid;
            } else if (absX < startX) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    private getRowFromY(mouseY: number): number {
        const absY = mouseY + this.viewport.getScrollY();
        if (absY < Constants.HEADER_HEIGHT) return -1;

        let low = 0;
        let high = Constants.TOTAL_ROWS - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            const startY = this.datastore.getRowOffset(mid);
            const endY = startY + this.datastore.getRowHeight(mid);
            if (absY >= startY && absY < endY) {
                return mid;
            } else if (absY < startY) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    public render(): void {
        this.renderer.render();
        this.formulaBarManager.updateUI();
    }
}
