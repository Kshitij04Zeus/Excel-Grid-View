import type { ICommand } from "./ICommand";

export class CommandHistory {
    private undoStack: ICommand[] = [];
    private redoStack: ICommand[] = [];

    public executeCommand(command: ICommand): void {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = []; // Clear redo stack on new command
    }

    public pushExecutedCommand(command: ICommand): void {
        this.undoStack.push(command);
        this.redoStack = [];
    }

    public undo(): void {
        const command = this.undoStack.pop();
        if (command) {
            command.undo();
            this.redoStack.push(command);
        }
    }

    public redo(): void {
        const command = this.redoStack.pop();
        if (command) {
            command.execute();
            this.undoStack.push(command);
        }
    }

    public canUndo(): boolean {
        return this.undoStack.length > 0;
    }

    public canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    public clear(): void {
        this.undoStack = [];
        this.redoStack = [];
    }
}
