export interface IFormulaParser {
    columnIndexToLetter(colIndex: number): string;
    columnLetterToIndex(colLetter: string): number;
    indexToCellRef(rowInd: number, colInd: number): string;
    getCellNumericValue(cellRef: string): number | null;
    expandRange(rangeStr: string): string[];
    evaluate(value: string | null): number | string;
}
//# sourceMappingURL=IFormulaParser.d.ts.map