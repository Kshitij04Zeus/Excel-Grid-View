import type { IMouseHandler } from "./IMouseHandler";
import type { SelectionManager } from "../SelectionManager";
import type { CoordinateManager } from "../CoordinateManager";
export declare class SelectionMouseHandler implements IMouseHandler {
    private selectionManager;
    private coordManager;
    private render;
    constructor(selectionManager: SelectionManager, coordManager: CoordinateManager, render: () => void);
    onMouseDown(event: MouseEvent): boolean;
    onMouseMove(event: MouseEvent): boolean;
    onMouseUp(event: MouseEvent): boolean;
}
//# sourceMappingURL=SelectionMouseHandler.d.ts.map