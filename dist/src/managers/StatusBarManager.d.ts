import type { SelectionManager } from "./SelectionManager";
import type { DataStore } from "../utils/DataStore";
export declare class StatusBarManager {
    private readonly selectionManager;
    private readonly datastore;
    private statsContainer;
    constructor(selectionManager: SelectionManager, datastore: DataStore);
    private initUI;
    updateUI(): void;
}
//# sourceMappingURL=StatusBarManager.d.ts.map