import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { SelectionManager } from "../SelectionManager";
import type { CoordinateManager } from "../CoordinateManager";
import { Constants } from "../../utils/Constants";

export class SelectionColumnHandler implements IMouseHandler {
    constructor(
        private selectionManager: SelectionManager,
        private coordManager: CoordinateManager,
        private render: () => void
    ) { }

    onMouseDown(event: PointerEvent): boolean {
        const isColHeaderClick = event.offsetY < Constants.HEADER_HEIGHT && event.offsetX >= Constants.HEADER_WIDTH;

        if (isColHeaderClick) {
            const column = this.coordManager.getColumnFromX(event.offsetX);
            if (column >= 0) {
                this.selectionManager.selectColumn(column);
                this.render();
            }
            return true;
        }

        return false;
    }
}
