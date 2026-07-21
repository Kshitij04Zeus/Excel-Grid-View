import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { ResizeManager } from "../ResizeManager";
import type { CommandManager } from "../../commands/CommandManager";
import type { ViewPort } from "../../utils/ViewPort";
import { Constants } from "../../utils/Constants";

export class ResizeRowHandler implements IMouseHandler {
    constructor(
        private canvas: HTMLCanvasElement,
        private resizeManager: ResizeManager,
        private commandManager: CommandManager,
        private viewport: ViewPort,
        private render: () => void
    ) { }

    onMouseDown(event: PointerEvent): boolean {
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

    onMouseMove(event: PointerEvent): boolean {
        this.canvas.style.cursor = "ns-resize";
        this.resizeManager.updateRowResize(event.offsetY);
        this.render();
        return true;
    }

    onMouseUp(event: PointerEvent): void {
        this.resizeManager.finishResize((cmd) => {
            this.commandManager.pushExecutedCommand(cmd);
        });
        this.canvas.style.cursor = "default";
        this.render();
    }

    onHover(event: PointerEvent): void {
        const resizeRow = this.resizeManager.detectRowResize(
            event.offsetY,
            this.viewport.getScrollY()
        );

        if (resizeRow !== -1 && event.offsetX <= Constants.HEADER_WIDTH) {
            this.canvas.style.cursor = "ns-resize";
        }
    }
}

