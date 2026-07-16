import type { ICommand } from "./ICommand";
export declare class CommandManager {
    private undoStack;
    private redoStack;
    executeCommand(command: ICommand): void;
    pushExecutedCommand(command: ICommand): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    clear(): void;
}
//# sourceMappingURL=CommandManager.d.ts.map