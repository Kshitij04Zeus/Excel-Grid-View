import type { Command } from "./Command";

export class CommandHistory {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    public executeCommand(command: Command): void {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = []; // Clear redo stack on new command
    }

    public pushExecutedCommand(command: Command): void {
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
