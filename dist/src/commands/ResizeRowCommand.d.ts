import type { ICommand } from "./ICommand";
import type { DataStore } from "../utils/DataStore";
export declare class ResizeRowCommand implements ICommand {
    private datastore;
    private row;
    private oldHeight;
    private newHeight;
    private onTriggerRender;
    constructor(datastore: DataStore, row: number, oldHeight: number, newHeight: number, onTriggerRender: () => void);
    execute(): void;
    undo(): void;
}
//# sourceMappingURL=ResizeRowCommand.d.ts.map