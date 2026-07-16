import type { Cell } from "./Cell";
import type { CellRange } from "./CellRange";
export declare class Selection {
    activeCell: Cell | null;
    range: CellRange | null;
    selectedRow: number;
    selectedColumn: number;
    constructor(activeCell?: Cell | null, range?: CellRange | null, selectedRow?: number, selectedColumn?: number);
}
//# sourceMappingURL=Selection.d.ts.map