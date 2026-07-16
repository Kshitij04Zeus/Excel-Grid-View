export class CommandManager {
    undoStack = [];
    redoStack = [];
    executeCommand(command) {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = []; // Clear redo stack on new command
    }
    pushExecutedCommand(command) {
        this.undoStack.push(command);
        this.redoStack = [];
    }
    undo() {
        const command = this.undoStack.pop();
        if (command) {
            command.undo();
            this.redoStack.push(command);
        }
    }
    redo() {
        const command = this.redoStack.pop();
        if (command) {
            command.execute();
            this.undoStack.push(command);
        }
    }
    canUndo() {
        return this.undoStack.length > 0;
    }
    canRedo() {
        return this.redoStack.length > 0;
    }
    clear() {
        this.undoStack = [];
        this.redoStack = [];
    }
}
//# sourceMappingURL=CommandManager.js.map