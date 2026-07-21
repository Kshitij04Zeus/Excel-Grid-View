import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { SelectionManager } from "../SelectionManager";
import type { CoordinateManager } from "../CoordinateManager";

export class SelectionCellHandler implements IMouseHandler {
    constructor(
        private selectionManager: SelectionManager,
        private coordManager: CoordinateManager,
        private render: () => void
    ) { }

    onMouseDown(event: PointerEvent): boolean {
        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row >= 0 && column >= 0) {
            this.selectionManager.startSelection(row, column);
            this.render();
            return true;
        }

        return false;
    }

    onMouseMove(event: PointerEvent): boolean {
        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row >= 0 && column >= 0) {
            this.selectionManager.updateSelection(row, column);
            this.render();
        }

        return true;
    }

    onMouseUp(event: PointerEvent): void {
        this.selectionManager.finishSelection();
    }
}

