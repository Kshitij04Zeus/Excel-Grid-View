import type { DataStore } from "../utils/DataStore";
import type { SelectionManager } from "../managers/SelectionManager";
import type { CommandManager } from "../commands/CommandManager";
export declare class FormulaBarManager {
    private readonly datastore;
    private readonly selectionManager;
    private readonly commandManager;
    private readonly onRenderRequired;
    private addressBox;
    private formulaInput;
    private formulaEditingOldValue;
    private formulaEditingRow;
    private formulaEditingCol;
    private formulaEngine;
    constructor(datastore: DataStore, selectionManager: SelectionManager, commandManager: CommandManager, onRenderRequired: () => void);
    private initUI;
    private commitFormulaEdit;
    private cancelFormulaEdit;
    updateUI(): void;
}
//# sourceMappingURL=FormulaBarManager.d.ts.map