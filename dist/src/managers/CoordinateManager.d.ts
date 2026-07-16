import type { DataStore } from "../utils/DataStore";
import type { ViewPort } from "../utils/ViewPort";
export declare class CoordinateManager {
    private readonly datastore;
    private readonly viewport;
    constructor(datastore: DataStore, viewport: ViewPort);
    getColumnFromX(mouseX: number): number;
    getRowFromY(mouseY: number): number;
}
//# sourceMappingURL=CoordinateManager.d.ts.map