import { SelectionManager } from "./SelectionManager";
import { CommandManager } from "../commands/CommandManager";
import { ViewPort } from "../utils/ViewPort";
import type { DataStore } from "../utils/DataStore";
export declare class KeyboardManager {
    private readonly selection;
    private readonly commandManager;
    private readonly datastore;
    private readonly viewport;
    private readonly canvas;
    private readonly render;
    constructor(selection: SelectionManager, commandManager: CommandManager, datastore: DataStore, viewport: ViewPort, canvas: HTMLCanvasElement, render: () => void);
    private handleKeyDown;
    private scrollIntoView;
}
//# sourceMappingURL=KeyboardManager.d.ts.map