import type { DataStore } from "./DataStore";
export declare class ViewPort {
    private datastore;
    private scrollX;
    private scrollY;
    constructor(datastore: DataStore);
    setScroll(x: number, y: number): void;
    getScrollX(): number;
    getScrollY(): number;
    getVisibleRows(canvasHeight: number): {
        start: number;
        end: number;
    };
    getVisibleColumns(canvasWidth: number): {
        start: number;
        end: number;
    };
}
//# sourceMappingURL=ViewPort.d.ts.map