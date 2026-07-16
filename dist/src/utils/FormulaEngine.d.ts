import type { IFormulaEngine } from "../interfaces/IFormulaEngine";
import { DataStore } from "./DataStore";
export declare class FormulaEngine implements IFormulaEngine {
    private dataStore;
    constructor(dataStore: DataStore);
    columnIndexToLetter(colIndex: number): string;
    columnLetterToIndex(colLetter: string): number;
    indexToCellRef(rowInd: number, colInd: number): string;
    getCellNumericValue(cellRef: string): number | null;
    expandRange(rangeStr: string): string[];
    evaluate(value: string | null): number | string;
}
//# sourceMappingURL=FormulaEngine.d.ts.map