import type { SelectionManager } from "../managers/SelectionManager";
import type { DataStore } from "./DataStore";
import type { ViewPort } from "./ViewPort";
export declare class Renderer {
    private readonly ctx;
    private readonly canvas;
    private readonly datastore;
    private readonly viewport;
    private readonly selectionManager;
    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, datastore: DataStore, viewport: ViewPort, selectionManager: SelectionManager);
    render(): void;
    private drawGridCells;
    private drawColumnHeaders;
    private drawRowHeaders;
    private drawTopLeftCorner;
    private drawSelection;
}
//# sourceMappingURL=Renderer.d.ts.map