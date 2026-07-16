import type { DataStore } from "../utils/DataStore";
import type { ViewPort } from "../utils/ViewPort";
export declare class ScrollBarManager {
    private readonly canvas;
    private readonly ctx;
    private readonly datastore;
    private readonly viewport;
    private readonly size;
    private readonly minThumbSize;
    private readonly trackColor;
    private readonly thumbColor;
    private readonly hoverColor;
    private hoveringHorizontal;
    private hoveringVertical;
    private draggingHorizontal;
    private draggingVertical;
    private dragOffset;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, datastore: DataStore, viewport: ViewPort);
    draw(): void;
    private drawHorizontalScrollbar;
    private drawVerticalScrollbar;
    private getHorizontalThumb;
    private getVerticalThumb;
    mouseDown(mouseX: number, mouseY: number): boolean;
    mouseMove(mouseX: number, mouseY: number): void;
    mouseUp(): void;
    isDragging(): boolean;
}
//# sourceMappingURL=ScrollBarManager.d.ts.map