import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { ViewPort } from "../../utils/ViewPort";
import type { DataStore } from "../../utils/DataStore";
import type { EditManager } from "../EditManager";
import { Constants } from "../../utils/Constants";

export class ScrollMouseHandler implements IMouseHandler {
    constructor(
        private canvas: HTMLCanvasElement,
        private datastore: DataStore,
        private viewport: ViewPort,
        private editManager: EditManager,
        private render: () => void
    ) { }

    onWheel(event: WheelEvent): boolean {
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
