export class EditCellCommand {
    datastore;
    row;
    column;
    oldValue;
    newValue;
    onTriggerRender;
    constructor(datastore, row, column, oldValue, newValue, onTriggerRender) {
        this.datastore = datastore;
        this.row = row;
        this.column = column;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.onTriggerRender = onTriggerRender;
    }
    execute() {
        this.datastore.setCellValue(this.row, this.column, this.newValue);
        this.onTriggerRender();
    }
    undo() {
        this.datastore.setCellValue(this.row, this.column, this.oldValue);
        this.onTriggerRender();
    }
}
//# sourceMappingURL=EditCellCommand.js.map