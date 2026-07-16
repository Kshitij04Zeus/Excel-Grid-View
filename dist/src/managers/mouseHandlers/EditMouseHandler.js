export class EditMouseHandler {
    datastore;
    viewport;
    coordManager;
    editManager;
    constructor(datastore, viewport, coordManager, editManager) {
        this.datastore = datastore;
        this.viewport = viewport;
        this.coordManager = coordManager;
        this.editManager = editManager;
    }
    onDblClick(event) {
        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);
        if (row < 0 || column < 0) {
            return false;
        }
        const left = this.datastore.getColumnOffset(column) - this.viewport.getScrollX();
        const top = this.datastore.getRowOffset(row) - this.viewport.getScrollY();
        this.editManager.startEditing(row, column, left, top, this.datastore.getColumnWidth(column), this.datastore.getRowHeight(row));
        return true;
    }
}
//# sourceMappingURL=EditMouseHandler.js.map