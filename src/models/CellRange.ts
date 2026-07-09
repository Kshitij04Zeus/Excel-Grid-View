export class CellRange {
    constructor(
        public startRow: number, 
        public startColumn: number, 
        public endRow: number, 
        public endColumn: number
    ) {}

    public normalize(): void { 
        if (this.startRow > this.endRow) { 
            [this.startRow, this.endRow] = [this.endRow, this.startRow]; 
        }
  
        if (this.startColumn > this.endColumn) {
            [this.startColumn, this.endColumn] = [this.endColumn, this.startColumn];
        }
    }

    public contains(row: number, column: number): boolean {
        return row >= this.startRow && 
               row <= this.endRow && 
               column >= this.startColumn && 
               column <= this.endColumn; 
    }
}
