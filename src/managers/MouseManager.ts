import type { SelectionManager } from "./SelectionManager";
import type { ResizeManager } from "./ResizeManager";
import type { EditManager } from "./EditManager";
import type { CommandManager } from "../commands/CommandManager";
import type { ViewPort } from "../utils/ViewPort";
import type { DataStore } from "../utils/DataStore";
import type { CoordinateManager } from "./CoordinateManager";
import type { ScrollBarManager } from "./ScrollBarManager";
import type { IMouseHandler } from "../interfaces/IMouseHandler";
import { ScrollBarMouseHandler } from "./mouseHandlers/ScrollBarMouseHandler";
import { ScrollMouseHandler } from "./mouseHandlers/ScrollMouseHandler";
import { ResizeMouseHandler } from "./mouseHandlers/ResizeMouseHandler";
import { SelectionMouseHandler } from "./mouseHandlers/SelectionMouseHandler";
import { EditMouseHandler } from "./mouseHandlers/EditMouseHandler";

export class MouseManager {
    private handlers: IMouseHandler[] = [];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly datastore: DataStore,
        private readonly viewport: ViewPort,
        private readonly selectionManager: SelectionManager,
        private readonly resizeManager: ResizeManager,
        private readonly editManager: EditManager,
        private readonly commandManager: CommandManager,
        private readonly coordManager: CoordinateManager,
        private readonly scrollBarManager: ScrollBarManager,
        private readonly render: () => void
    ) {
        this.registerHandlers();
        this.initEvents();
    }

    private registerHandlers(): void {
        this.handlers = [
            new ScrollBarMouseHandler(this.scrollBarManager, this.render),
            new ScrollMouseHandler(this.canvas, this.datastore, this.viewport, this.editManager, this.render),
            new ResizeMouseHandler(this.canvas, this.resizeManager, this.commandManager, this.viewport, this.render),
            new SelectionMouseHandler(this.selectionManager, this.coordManager, this.render),
            new EditMouseHandler(this.datastore, this.viewport, this.coordManager, this.editManager)
        ];
    }

    private initEvents(): void {
        this.canvas.addEventListener("wheel", this.handleWheel.bind(this), { passive: false });
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("dblclick", this.handleDblClick.bind(this));
    }

    private handleWheel(event: WheelEvent): void {
        for (const handler of this.handlers) {
            if (handler.onWheel && handler.onWheel(event)) break;
        }
    }

    private handleMouseDown(event: MouseEvent): void {
        for (const handler of this.handlers) {
            if (handler.onMouseDown && handler.onMouseDown(event)) break;
        }
    }

    private handleMouseMove(event: MouseEvent): void {
        for (const handler of this.handlers) {
            if (handler.onMouseMove && handler.onMouseMove(event)) break;
        }
    }

    private handleMouseUp(event: MouseEvent): void {
        for (const handler of this.handlers) {
            if (handler.onMouseUp && handler.onMouseUp(event)) break;
        }
    }

    private handleDblClick(event: MouseEvent): void {
        for (const handler of this.handlers) {
            if (handler.onDblClick && handler.onDblClick(event)) break;
        }
    }
}
