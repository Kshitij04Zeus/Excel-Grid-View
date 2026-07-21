import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { ScrollBarManager } from "../ScrollBarManager";

export class ScrollBarMouseHandler implements IMouseHandler {
    constructor(
        private scrollBarManager: ScrollBarManager,
        private render: () => void
    ) { }

    onMouseDown(event: PointerEvent): boolean {
        if (this.scrollBarManager.mouseDown(event.offsetX, event.offsetY)) {
            this.render();
            return true;
        }
        return false;
    }

    onMouseMove(event: PointerEvent): boolean {
        this.scrollBarManager.mouseMove(event.offsetX, event.offsetY);
        this.render();
        return true;
    }

    onMouseUp(event: PointerEvent): void {
        this.scrollBarManager.mouseUp();
        this.render();
    }
}

