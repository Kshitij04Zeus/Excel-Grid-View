import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { ScrollBarManager } from "../ScrollBarManager";

export class ScrollBarMouseHandler implements IMouseHandler {
    constructor(
        private scrollBarManager: ScrollBarManager,
        private render: () => void
    ) {}

    onMouseDown(event: MouseEvent): boolean {
        if (this.scrollBarManager.mouseDown(event.offsetX, event.offsetY)) {
            this.render();
            return true;
        }
        return false;
    }

    onMouseMove(event: MouseEvent): boolean {
        if (this.scrollBarManager.isDragging()) {
            this.scrollBarManager.mouseMove(event.offsetX, event.offsetY);
            this.render();
            return true;
        }
        return false;
    }

    onMouseUp(event: MouseEvent): boolean {
        if (this.scrollBarManager.isDragging()) {
            this.scrollBarManager.mouseUp();
            this.render();
            return true;
        }
        this.scrollBarManager.mouseUp();
        return false;
    }
}
