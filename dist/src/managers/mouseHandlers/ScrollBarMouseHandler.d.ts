import type { IMouseHandler } from "./IMouseHandler";
import type { ScrollBarManager } from "../ScrollBarManager";
export declare class ScrollBarMouseHandler implements IMouseHandler {
    private scrollBarManager;
    private render;
    constructor(scrollBarManager: ScrollBarManager, render: () => void);
    onMouseDown(event: MouseEvent): boolean;
    onMouseMove(event: MouseEvent): boolean;
    onMouseUp(event: MouseEvent): boolean;
}
//# sourceMappingURL=ScrollBarMouseHandler.d.ts.map