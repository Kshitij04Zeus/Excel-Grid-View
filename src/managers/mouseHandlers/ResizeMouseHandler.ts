import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { ResizeManager } from "../ResizeManager";
import type { CommandManager } from "../../commands/CommandManager";
import type { ViewPort } from "../../utils/ViewPort";
import { Constants } from "../../utils/Constants";
import { ResizeType } from "../../models/ResizeState";

export class ResizeMouseHandler implements IMouseHandler {
    constructor(
        private canvas: HTMLCanvasElement,
        private resizeManager: ResizeManager,
        private commandManager: CommandManager,
        private viewport: ViewPort,
        private render: () => void
    ) {}

    onMouseDown(event: MouseEvent): boolean {
        const resizeColumn = this.resizeManager.detectColumnResize(
            event.offsetX,
            this.viewport.getScrollX()
        );

        if (resizeColumn !== -1 && event.offsetY <= Constants.HEADER_HEIGHT) {
            this.resizeManager.startColumnResize(resizeColumn, event.offsetX);
            return true;
        }

        const resizeRow = this.resizeManager.detectRowResize(
            event.offsetY,
            this.viewport.getScrollY()
        );

        if (resizeRow !== -1 && event.offsetX <= Constants.HEADER_WIDTH) {
            this.resizeManager.startRowResize(resizeRow, event.offsetY);
            return true;
        }

        return false;
    }

    onMouseMove(event: MouseEvent): boolean {
        if (this.resizeManager.isResizing()) {
            if (this.resizeManager.getState().type === ResizeType.Column) {
                this.canvas.style.cursor = "ew-resize";
                this.resizeManager.updateColumnResize(event.offsetX);
            } else {
                this.canvas.style.cursor = "ns-resize";
                this.resizeManager.updateRowResize(event.offsetY);
            }
            this.render();
            return true;
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

        return false;
    }

    onMouseUp(event: MouseEvent): boolean {
        if (this.resizeManager.isResizing()) {
            this.resizeManager.finishResize((cmd) => {
                this.commandManager.pushExecutedCommand(cmd);
            });
            this.canvas.style.cursor = "default";
            this.render();
            return true;
        }
        return false;
    }
}
