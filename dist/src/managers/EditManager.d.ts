import { DataStore } from "../utils/DataStore";
import { CommandManager } from "../commands/CommandManager";
export declare class EditManager {
    private readonly container;
    private readonly datastore;
    private readonly commandManager;
    private readonly onValueChanged;
    private inputElement;
    private editingCell;
    private editingRow;
    private editingColumn;
    constructor(container: HTMLElement, datastore: DataStore, commandManager: CommandManager, onValueChanged: () => void);
    private registerEvents;
    startEditing(row: number, column: number, left: number, top: number, width: number, height: number): void;
    private save;
    cancel(): void;
    updatePosition(scrollX: number, scrollY: number): void;
    private hide;
}
//# sourceMappingURL=EditManager.d.ts.map