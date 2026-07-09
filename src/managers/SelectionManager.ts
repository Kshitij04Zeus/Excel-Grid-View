import { Cell } from "../models/Cell";
import { CellRange } from "../models/CellRange";
import { Selection } from "../models/Selection";

export class SelectionManager {
    private selection: Selection;
    private dragging = false;

    constructor() {
        this.selection = new Selection();
    }

    public startSelection(row: number, column: number): void {
        this.dragging = true;
        this.selection.activeCell = new Cell(row, column);
        this.selection.range = new CellRange(row, column, row, column);
        this.selection.selectedRow = -1;
        this.selection.selectedColumn = -1;
    }

    public updateSelection(row: number, column: number): void {
        if (!this.dragging || !this.selection.range) {
            return;
        }
        this.selection.range.endRow = row;
        this.selection.range.endColumn = column;
    }

    public finishSelection(): void {
        this.dragging = false;
    }

    public selectRow(row: number): void {
        this.selection.selectedRow = row;
        this.selection.selectedColumn = -1;
        this.selection.range = null;
        this.selection.activeCell = new Cell(row, 0);
    }

    public selectColumn(column: number): void {
        this.selection.selectedColumn = column;
        this.selection.selectedRow = -1;
        this.selection.range = null;
        this.selection.activeCell = new Cell(0, column);
    }

    public clear(): void {
        this.selection.activeCell = null;
        this.selection.range = null;
        this.selection.selectedRow = -1;
        this.selection.selectedColumn = -1;
        this.dragging = false;
    }

    public getSelection(): Selection {
        return this.selection;
    }

    public getRange(): CellRange | null {
        return this.selection.range;
    }

    public hasSelection(): boolean {
        return this.selection.range !== null;
    }
}
