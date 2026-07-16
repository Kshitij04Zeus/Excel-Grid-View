import type { IMouseHandler } from "./IMouseHandler";
import type { ViewPort } from "../../utils/ViewPort";
import type { DataStore } from "../../utils/DataStore";
import type { EditManager } from "../EditManager";
export declare class ScrollMouseHandler implements IMouseHandler {
    private canvas;
    private datastore;
    private viewport;
    private editManager;
    private render;
    constructor(canvas: HTMLCanvasElement, datastore: DataStore, viewport: ViewPort, editManager: EditManager, render: () => void);
    onWheel(event: WheelEvent): boolean;
}
//# sourceMappingURL=ScrollMouseHandler.d.ts.map