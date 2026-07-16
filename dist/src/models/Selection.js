export class Selection {
    activeCell;
    range;
    selectedRow;
    selectedColumn;
    constructor(activeCell = null, range = null, selectedRow = -1, selectedColumn = -1) {
        this.activeCell = activeCell;
        this.range = range;
        this.selectedRow = selectedRow;
        this.selectedColumn = selectedColumn;
    }
}
//# sourceMappingURL=Selection.js.map