import type { ICommand } from "./ICommand";
import type { DataStore } from "../utils/DataStore";
export declare class ResizeColumnCommand implements ICommand {
    private datastore;
    private column;
    private oldWidth;
    private newWidth;
    private onTriggerRender;
    constructor(datastore: DataStore, column: number, oldWidth: number, newWidth: number, onTriggerRender: () => void);
    execute(): void;
    undo(): void;
}
//# sourceMappingURL=ResizeColumnCommand.d.ts.map