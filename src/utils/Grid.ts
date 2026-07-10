import type { DataStore } from "./DataStore";
import type { ViewPort } from "./ViewPort";
import { Renderer } from "./Renderer";
import { SelectionManager } from "../managers/SelectionManager";
import { EditManager } from "../managers/EditManager";
import { ResizeManager } from "../managers/ResizeManager";
import { CommandManager } from "../commands/CommandManager";
import { FormulaBarManager } from "../managers/FormulaBarManager";
import { KeyboardManager } from "../managers/KeyboardManager";
import { CoordinateManager } from "../managers/CoordinateManager";
import { MouseManager } from "../managers/MouseManager";
import { StatusBarManager } from "../managers/StatusBarManager";

export class Grid {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private renderer: Renderer;
    private readonly selectionManager: SelectionManager;
    private editManager: EditManager;
    private resizeManager: ResizeManager;
    private commandManager: CommandManager;
    private keyboardManager: KeyboardManager
    private formulaBarManager: FormulaBarManager;
    private coordinateManager: CoordinateManager;
    private mouseManager: MouseManager;
    private statusBarManager:StatusBarManager;

    constructor(private datastore: DataStore, private viewport: ViewPort, canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;
        this.commandManager = new CommandManager();
        const canvasContainer = canvasElement.parentElement || document.body;
        this.editManager = new EditManager(canvasContainer, this.datastore, this.commandManager, () => this.render());
        this.resizeManager = new ResizeManager(this.datastore);
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Could not obtain 2D rendering context.");
        }
        this.ctx = context;
        this.selectionManager = new SelectionManager();
        this.renderer = new Renderer(this.ctx, this.canvas, this.datastore, this.viewport, this.selectionManager);
        this.formulaBarManager = new FormulaBarManager(
            this.datastore,
            this.selectionManager,
            this.commandManager,
            () => this.render()
        )

        this.keyboardManager = new KeyboardManager(
            this.selectionManager,
            this.commandManager,
            this.datastore,
            this.viewport,
            this.canvas,
            () => this.render()
        );

        this.coordinateManager = new CoordinateManager(this.datastore, this.viewport);

        this.mouseManager = new MouseManager(
            this.canvas,
            this.datastore,
            this.viewport,
            this.selectionManager,
            this.resizeManager,
            this.editManager,
            this.commandManager,
            this.coordinateManager,
            () => this.render());

        this.statusBarManager = new StatusBarManager(
            this.selectionManager,
            this.datastore
        );
        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.resizeCanvas();
    }

    private resizeCanvas(): void {
        this.canvas.width = this.canvas.clientWidth || window.innerWidth;
        this.canvas.height = this.canvas.clientHeight || window.innerHeight;
        this.render();
    }

    public render(): void {
        this.renderer.render();
        this.formulaBarManager.updateUI();
        this.statusBarManager.updateUI(); 
    }
}
