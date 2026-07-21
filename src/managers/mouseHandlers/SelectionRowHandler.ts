import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { SelectionManager } from "../SelectionManager";
import type { CoordinateManager } from "../CoordinateManager";
import { Constants } from "../../utils/Constants";

export class SelectionRowHandler implements IMouseHandler {
    constructor(
        private selectionManager: SelectionManager,
        private coordManager: CoordinateManager,
        private render: () => void
    ) { }

    onMouseDown(event: PointerEvent): boolean {
        const isRowHeaderClick = event.offsetX < Constants.HEADER_WIDTH && event.offsetY >= Constants.HEADER_HEIGHT;

        if (isRowHeaderClick) {
            const row = this.coordManager.getRowFromY(event.offsetY);
            if (row >= 0) {
                this.selectionManager.selectRow(row);
                this.render();
            }
            return true;
        }

        return false;
    }
}
