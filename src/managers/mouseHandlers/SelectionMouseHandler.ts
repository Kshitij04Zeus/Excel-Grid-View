import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { SelectionManager } from "../SelectionManager";
import type { CoordinateManager } from "../CoordinateManager";
import { Constants } from "../../utils/Constants";

export class SelectionMouseHandler implements IMouseHandler {
    constructor(
        private selectionManager: SelectionManager,
        private coordManager: CoordinateManager,
        private render: () => void
    ) {}

    onMouseDown(event: MouseEvent): boolean {
        const isRowHeaderClick = event.offsetX < Constants.HEADER_WIDTH && event.offsetY >= Constants.HEADER_HEIGHT;
        const isColHeaderClick = event.offsetY < Constants.HEADER_HEIGHT && event.offsetX >= Constants.HEADER_WIDTH;

        if (isRowHeaderClick) {
            const row = this.coordManager.getRowFromY(event.offsetY);
            if (row >= 0) {
                this.selectionManager.selectRow(row);
                this.render();
            }
            return true;
        }

        if (isColHeaderClick) {
            const column = this.coordManager.getColumnFromX(event.offsetX);
            if (column >= 0) {
                this.selectionManager.selectColumn(column);
                this.render();
            }
            return true;
        }

        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row >= 0 && column >= 0) {
            this.selectionManager.startSelection(row, column);
            this.render();
            return true;
        }

        return false;
    }

    onMouseMove(event: MouseEvent): boolean {
        if ((event.buttons & 1) === 0) {
            return false;
        }

        const selection = this.selectionManager.getSelection();
        if (selection.selectedRow !== -1 || selection.selectedColumn !== -1) {
            return false;
        }

        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row >= 0 && column >= 0) {
            this.selectionManager.updateSelection(row, column);
            this.render();
            return true;
        }

        return false;
    }

    onMouseUp(event: MouseEvent): boolean {
        this.selectionManager.finishSelection();
        return false;
    }
}
