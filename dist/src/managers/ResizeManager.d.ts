import type { DataStore } from "../utils/DataStore";
import { ResizeState } from "../models/ResizeState";
import type { ICommand } from "../commands/ICommand";
export declare class ResizeManager {
    private readonly datastore;
    private readonly state;
    constructor(datastore: DataStore);
    isResizing(): boolean;
    getState(): ResizeState;
    detectColumnResize(mouseX: number, scrollX: number): number;
    startColumnResize(column: number, mouseX: number): void;
    startRowResize(row: number, mouseY: number): void;
    updateColumnResize(mouseX: number): void;
    updateRowResize(mouseY: number): void;
    detectRowResize(mouseY: number, scrollY: number): number;
    finishResize(onCommandCreated?: (cmd: ICommand) => void): void;
}
//# sourceMappingURL=ResizeManager.d.ts.map