import { Constants } from "../../utils/Constants";
export class ScrollMouseHandler {
    canvas;
    datastore;
    viewport;
    editManager;
    render;
    constructor(canvas, datastore, viewport, editManager, render) {
        this.canvas = canvas;
        this.datastore = datastore;
        this.viewport = viewport;
        this.editManager = editManager;
        this.render = render;
    }
    onWheel(event) {
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
        return true;
    }
}
//# sourceMappingURL=ScrollMouseHandler.js.map