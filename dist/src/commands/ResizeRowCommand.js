export class ResizeRowCommand {
    datastore;
    row;
    oldHeight;
    newHeight;
    onTriggerRender;
    constructor(datastore, row, oldHeight, newHeight, onTriggerRender) {
        this.datastore = datastore;
        this.row = row;
        this.oldHeight = oldHeight;
        this.newHeight = newHeight;
        this.onTriggerRender = onTriggerRender;
    }
    execute() {
        this.datastore.setRowHeight(this.row, this.newHeight);
        this.onTriggerRender();
    }
    undo() {
        this.datastore.setRowHeight(this.row, this.oldHeight);
        this.onTriggerRender();
    }
}
//# sourceMappingURL=ResizeRowCommand.js.map