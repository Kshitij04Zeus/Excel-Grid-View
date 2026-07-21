import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { ResizeManager } from "../ResizeManager";
import type { CommandManager } from "../../commands/CommandManager";
import type { ViewPort } from "../../utils/ViewPort";
import { Constants } from "../../utils/Constants";

export class ResizeColumnHandler implements IMouseHandler {
    constructor(
        private canvas: HTMLCanvasElement,
        private resizeManager: ResizeManager,
        private commandManager: CommandManager,
        private viewport: ViewPort,
        private render: () => void
    ) { }

    onMouseDown(event: PointerEvent): boolean {
        const resizeColumn = this.resizeManager.detectColumnResize(
            event.offsetX,
            this.viewport.getScrollX()
        );

        if (resizeColumn !== -1 && event.offsetY <= Constants.HEADER_HEIGHT) {
            this.resizeManager.startColumnResize(resizeColumn, event.offsetX);
            return true;
        }

        return false;
    }

    onMouseMove(event: PointerEvent): boolean {
        this.canvas.style.cursor = "ew-resize";
        this.resizeManager.updateColumnResize(event.offsetX);
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
        const resizeColumn = this.resizeManager.detectColumnResize(
            event.offsetX,
            this.viewport.getScrollX()
        );

        if (resizeColumn !== -1 && event.offsetY <= Constants.HEADER_HEIGHT) {
            this.canvas.style.cursor = "ew-resize";
        }
    }
}

