import type { SelectionManager } from "./SelectionManager";
import type { ResizeManager } from "./ResizeManager";
import type { EditManager } from "./EditManager";
import type { CommandManager } from "../commands/CommandManager";
import type { ViewPort } from "../utils/ViewPort";
import type { DataStore } from "../utils/DataStore";
import type { CoordinateManager } from "./CoordinateManager";
import type { ScrollBarManager } from "./ScrollBarManager";
export declare class MouseManager {
    private readonly canvas;
    private readonly datastore;
    private readonly viewport;
    private readonly selectionManager;
    private readonly resizeManager;
    private readonly editManager;
    private readonly commandManager;
    private readonly coordManager;
    private readonly scrollBarManager;
    private readonly render;
    private handlers;
    constructor(canvas: HTMLCanvasElement, datastore: DataStore, viewport: ViewPort, selectionManager: SelectionManager, resizeManager: ResizeManager, editManager: EditManager, commandManager: CommandManager, coordManager: CoordinateManager, scrollBarManager: ScrollBarManager, render: () => void);
    private registerHandlers;
    private initEvents;
    private handleWheel;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleDblClick;
}
//# sourceMappingURL=MouseManager.d.ts.map