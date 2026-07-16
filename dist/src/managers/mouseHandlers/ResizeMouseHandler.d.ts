import type { IMouseHandler } from "./IMouseHandler";
import type { ResizeManager } from "../ResizeManager";
import type { CommandManager } from "../../commands/CommandManager";
import type { ViewPort } from "../../utils/ViewPort";
export declare class ResizeMouseHandler implements IMouseHandler {
    private canvas;
    private resizeManager;
    private commandManager;
    private viewport;
    private render;
    constructor(canvas: HTMLCanvasElement, resizeManager: ResizeManager, commandManager: CommandManager, viewport: ViewPort, render: () => void);
    onMouseDown(event: MouseEvent): boolean;
    onMouseMove(event: MouseEvent): boolean;
    onMouseUp(event: MouseEvent): boolean;
}
//# sourceMappingURL=ResizeMouseHandler.d.ts.map