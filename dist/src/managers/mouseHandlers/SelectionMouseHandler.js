import { Constants } from "../../utils/Constants";
export class SelectionMouseHandler {
    selectionManager;
    coordManager;
    render;
    constructor(selectionManager, coordManager, render) {
        this.selectionManager = selectionManager;
        this.coordManager = coordManager;
        this.render = render;
    }
    onMouseDown(event) {
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
    onMouseMove(event) {
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
    onMouseUp(event) {
        this.selectionManager.finishSelection();
        return false;
    }
}
//# sourceMappingURL=SelectionMouseHandler.js.map