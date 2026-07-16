export declare class CellRange {
    startRow: number;
    startColumn: number;
    endRow: number;
    endColumn: number;
    constructor(startRow: number, startColumn: number, endRow: number, endColumn: number);
    normalize(): void;
    contains(row: number, column: number): boolean;
}
//# sourceMappingURL=CellRange.d.ts.map