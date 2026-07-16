export class ResizeColumnCommand {
    datastore;
    column;
    oldWidth;
    newWidth;
    onTriggerRender;
    constructor(datastore, column, oldWidth, newWidth, onTriggerRender) {
        this.datastore = datastore;
        this.column = column;
        this.oldWidth = oldWidth;
        this.newWidth = newWidth;
        this.onTriggerRender = onTriggerRender;
    }
    execute() {
        this.datastore.setColumnWidth(this.column, this.newWidth);
        this.onTriggerRender();
    }
    undo() {
        this.datastore.setColumnWidth(this.column, this.oldWidth);
        this.onTriggerRender();
    }
}
//# sourceMappingURL=ResizeColumnCommand.js.map