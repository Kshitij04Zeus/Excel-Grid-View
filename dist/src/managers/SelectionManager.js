import { Cell } from "../models/Cell";
import { CellRange } from "../models/CellRange";
import { Selection } from "../models/Selection";
export class SelectionManager {
    selection;
    dragging = false;
    constructor() {
        this.selection = new Selection();
    }
    startSelection(row, column) {
        this.dragging = true;
        this.selection.activeCell = new Cell(row, column);
        this.selection.range = new CellRange(row, column, row, column);
        this.selection.selectedRow = -1;
        this.selection.selectedColumn = -1;
    }
    updateSelection(row, column) {
        if (!this.dragging || !this.selection.range) {
            return;
        }
        this.selection.range.endRow = row;
        this.selection.range.endColumn = column;
    }
    finishSelection() {
        this.dragging = false;
    }
    selectRow(row) {
        this.selection.selectedRow = row;
        this.selection.selectedColumn = -1;
        this.selection.range = null;
        this.selection.activeCell = new Cell(row, 0);
    }
    selectColumn(column) {
        this.selection.selectedColumn = column;
        this.selection.selectedRow = -1;
        this.selection.range = null;
        this.selection.activeCell = new Cell(0, column);
    }
    clear() {
        this.selection.activeCell = null;
        this.selection.range = null;
        this.selection.selectedRow = -1;
        this.selection.selectedColumn = -1;
        this.dragging = false;
    }
    getSelection() {
        return this.selection;
    }
    getRange() {
        return this.selection.range;
    }
    hasSelection() {
        return this.selection.range !== null;
    }
}
//# sourceMappingURL=SelectionManager.js.map