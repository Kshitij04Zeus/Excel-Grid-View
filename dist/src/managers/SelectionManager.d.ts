import { CellRange } from "../models/CellRange";
import { Selection } from "../models/Selection";
export declare class SelectionManager {
    private selection;
    private dragging;
    constructor();
    startSelection(row: number, column: number): void;
    updateSelection(row: number, column: number): void;
    finishSelection(): void;
    selectRow(row: number): void;
    selectColumn(column: number): void;
    clear(): void;
    getSelection(): Selection;
    getRange(): CellRange | null;
    hasSelection(): boolean;
}
//# sourceMappingURL=SelectionManager.d.ts.map