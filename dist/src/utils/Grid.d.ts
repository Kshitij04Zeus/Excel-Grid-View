import type { DataStore } from "./DataStore";
import type { ViewPort } from "./ViewPort";
export declare class Grid {
    private datastore;
    private viewport;
    private canvas;
    private ctx;
    private renderer;
    private readonly selectionManager;
    private editManager;
    private resizeManager;
    private commandManager;
    private keyboardManager;
    private formulaBarManager;
    private coordinateManager;
    private mouseManager;
    private statusBarManager;
    private scrollBarManager;
    constructor(datastore: DataStore, viewport: ViewPort, canvasElement: HTMLCanvasElement);
    private resizeCanvas;
    render(): void;
}
//# sourceMappingURL=Grid.d.ts.map