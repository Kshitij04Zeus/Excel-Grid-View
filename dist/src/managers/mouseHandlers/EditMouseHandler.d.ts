import type { IMouseHandler } from "./IMouseHandler";
import type { CoordinateManager } from "../CoordinateManager";
import type { DataStore } from "../../utils/DataStore";
import type { ViewPort } from "../../utils/ViewPort";
import type { EditManager } from "../EditManager";
export declare class EditMouseHandler implements IMouseHandler {
    private datastore;
    private viewport;
    private coordManager;
    private editManager;
    constructor(datastore: DataStore, viewport: ViewPort, coordManager: CoordinateManager, editManager: EditManager);
    onDblClick(event: MouseEvent): boolean;
}
//# sourceMappingURL=EditMouseHandler.d.ts.map