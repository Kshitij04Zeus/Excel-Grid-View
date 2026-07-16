import type { ICommand } from "./ICommand";
import type { DataStore } from "../utils/DataStore";
export declare class EditCellCommand implements ICommand {
    private datastore;
    private row;
    private column;
    private oldValue;
    private newValue;
    private onTriggerRender;
    constructor(datastore: DataStore, row: number, column: number, oldValue: string, newValue: string, onTriggerRender: () => void);
    execute(): void;
    undo(): void;
}
//# sourceMappingURL=EditCellCommand.d.ts.map