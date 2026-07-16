import { ScrollBarMouseHandler } from "./mouseHandlers/ScrollBarMouseHandler";
import { ScrollMouseHandler } from "./mouseHandlers/ScrollMouseHandler";
import { ResizeMouseHandler } from "./mouseHandlers/ResizeMouseHandler";
import { SelectionMouseHandler } from "./mouseHandlers/SelectionMouseHandler";
import { EditMouseHandler } from "./mouseHandlers/EditMouseHandler";
export class MouseManager {
    canvas;
    datastore;
    viewport;
    selectionManager;
    resizeManager;
    editManager;
    commandManager;
    coordManager;
    scrollBarManager;
    render;
    handlers = [];
    constructor(canvas, datastore, viewport, selectionManager, resizeManager, editManager, commandManager, coordManager, scrollBarManager, render) {
        this.canvas = canvas;
        this.datastore = datastore;
        this.viewport = viewport;
        this.selectionManager = selectionManager;
        this.resizeManager = resizeManager;
        this.editManager = editManager;
        this.commandManager = commandManager;
        this.coordManager = coordManager;
        this.scrollBarManager = scrollBarManager;
        this.render = render;
        this.registerHandlers();
        this.initEvents();
    }
    registerHandlers() {
        this.handlers = [
            new ScrollBarMouseHandler(this.scrollBarManager, this.render),
            new ScrollMouseHandler(this.canvas, this.datastore, this.viewport, this.editManager, this.render),
            new ResizeMouseHandler(this.canvas, this.resizeManager, this.commandManager, this.viewport, this.render),
            new SelectionMouseHandler(this.selectionManager, this.coordManager, this.render),
            new EditMouseHandler(this.datastore, this.viewport, this.coordManager, this.editManager)
        ];
    }
    initEvents() {
        this.canvas.addEventListener("wheel", this.handleWheel.bind(this), { passive: false });
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("dblclick", this.handleDblClick.bind(this));
    }
    handleWheel(event) {
        for (const handler of this.handlers) {
            if (handler.onWheel && handler.onWheel(event))
                break;
        }
    }
    handleMouseDown(event) {
        for (const handler of this.handlers) {
            if (handler.onMouseDown && handler.onMouseDown(event))
                break;
        }
    }
    handleMouseMove(event) {
        for (const handler of this.handlers) {
            if (handler.onMouseMove && handler.onMouseMove(event))
                break;
        }
    }
    handleMouseUp(event) {
        for (const handler of this.handlers) {
            if (handler.onMouseUp && handler.onMouseUp(event))
                break;
        }
    }
    handleDblClick(event) {
        for (const handler of this.handlers) {
            if (handler.onDblClick && handler.onDblClick(event))
                break;
        }
    }
}
//# sourceMappingURL=MouseManager.js.map