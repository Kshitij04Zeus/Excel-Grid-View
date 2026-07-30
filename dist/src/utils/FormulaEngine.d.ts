import type { IFormulaParser } from "../interfaces/IFormulaParser";
import { DataStore } from "./DataStore";
export declare class FormulaParser implements IFormulaParser {
    private dataStore;
    constructor(dataStore: DataStore);
    columnIndexToLetter(colIndex: number): string;
    columnLetterToIndex(colLetter: string): number;
    indexToCellRef(rowInd: number, colInd: number): string;
    getCellNumericValue(cellRef: string): number | null;
    expandRange(rangeStr: string): string[];
    evaluate(value: string | null): number | string;
}
//# sourceMappingURL=FormulaParser.d.ts.map