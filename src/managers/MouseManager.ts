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
import { EditMouseHandler } from "./mouseHandlers/EditMouseHandler";
import { ResizeColumnHandler } from "./mouseHandlers/ResizeColumnHandler";
import { SelectionRowHandler } from "./mouseHandlers/SelectionRowHandler";
import { SelectionColumnHandler } from "./mouseHandlers/SelectionColumnHandler";
import { ResizeRowHandler } from "./mouseHandlers/ResizeRowHandler";
import { SelectionCellHandler } from "./mouseHandlers/SelectionCellHandler";

export class MouseManager {
    private handlers: IMouseHandler[] = [];
    private activeHandler: IMouseHandler | null = null;

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
            new ResizeColumnHandler(this.canvas, this.resizeManager, this.commandManager, this.viewport, this.render),
            new ResizeRowHandler(this.canvas, this.resizeManager, this.commandManager, this.viewport, this.render),
            new SelectionRowHandler(this.selectionManager, this.coordManager, this.render),
            new SelectionColumnHandler(this.selectionManager, this.coordManager, this.render),
            new SelectionCellHandler(this.selectionManager, this.coordManager, this.render),
            new EditMouseHandler(this.datastore, this.viewport, this.coordManager, this.editManager)
        ];
    }

    private initEvents(): void {
        this.canvas.addEventListener("wheel", this.handleWheel.bind(this), { passive: false });
        this.canvas.addEventListener("pointerdown", this.handlePointerDown.bind(this));
        this.canvas.addEventListener("pointermove", this.handlePointerMove.bind(this));
        this.canvas.addEventListener("pointerup", this.handlePointerUp.bind(this));
        this.canvas.addEventListener("dblclick", this.handleDblClick.bind(this));
    }

    private handleWheel(event: WheelEvent): void {
        for (const handler of this.handlers) {
            if (handler.onWheel && handler.onWheel(event)) break;
        }
    }

    private handlePointerDown(event: PointerEvent): void {
        for (const handler of this.handlers) {
            if (handler.onMouseDown && handler.onMouseDown(event)) {
                this.activeHandler = handler;
                this.canvas.setPointerCapture(event.pointerId);
                break;
            }
        }
    }

    private handlePointerMove(event: PointerEvent): void {
        if(this.activeHandler)
        {
            this.activeHandler.onMouseMove?.(event);
            return;
        }
        this.canvas.style.cursor="default";
        for (const handler of this.handlers) {
            handler.onHover?.(event);
        }
    }

    private handlePointerUp(event: PointerEvent): void {
        if(this.activeHandler)
        {
            this.activeHandler.onMouseUp?.(event);
            this.activeHandler=null;
            this.canvas.releasePointerCapture(event.pointerId);
        }
    }

    private handleDblClick(event: MouseEvent): void {
        for (const handler of this.handlers) {
            if (handler.onDblClick && handler.onDblClick(event)) break;
        }
    }
}
