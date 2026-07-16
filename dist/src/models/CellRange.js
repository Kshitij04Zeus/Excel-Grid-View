export class CellRange {
    startRow;
    startColumn;
    endRow;
    endColumn;
    constructor(startRow, startColumn, endRow, endColumn) {
        this.startRow = startRow;
        this.startColumn = startColumn;
        this.endRow = endRow;
        this.endColumn = endColumn;
    }
    normalize() {
        if (this.startRow > this.endRow) {
            [this.startRow, this.endRow] = [this.endRow, this.startRow];
        }
        if (this.startColumn > this.endColumn) {
            [this.startColumn, this.endColumn] = [this.endColumn, this.startColumn];
        }
    }
    contains(row, column) {
        return row >= this.startRow &&
            row <= this.endRow &&
            column >= this.startColumn &&
            column <= this.endColumn;
    }
}
//# sourceMappingURL=CellRange.js.map