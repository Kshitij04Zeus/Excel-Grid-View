export interface IFormulaParser {
    columnIndexToLetter(colIndex: number): string;
    columnLetterToIndex(colLetter: string): number;
    indexToCellRef(rowInd: number, colInd: number): string;
    getCellNumericValue(cellRef: string, visited: Set<string>): number | null;
    expandRange(rangeStr: string): string[];
    evaluate(value: string | null, visited?: Set<string>): number | string;
}
