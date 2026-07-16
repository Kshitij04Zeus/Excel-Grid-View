export class ScrollBarMouseHandler {
    scrollBarManager;
    render;
    constructor(scrollBarManager, render) {
        this.scrollBarManager = scrollBarManager;
        this.render = render;
    }
    onMouseDown(event) {
        if (this.scrollBarManager.mouseDown(event.offsetX, event.offsetY)) {
            this.render();
            return true;
        }
        return false;
    }
    onMouseMove(event) {
        if (this.scrollBarManager.isDragging()) {
            this.scrollBarManager.mouseMove(event.offsetX, event.offsetY);
            this.render();
            return true;
        }
        return false;
    }
    onMouseUp(event) {
        if (this.scrollBarManager.isDragging()) {
            this.scrollBarManager.mouseUp();
            this.render();
            return true;
        }
        this.scrollBarManager.mouseUp();
        return false;
    }
}
//# sourceMappingURL=ScrollBarMouseHandler.js.map