import type { IMouseHandler } from "../../interfaces/IMouseHandler";
import type { CoordinateManager } from "../CoordinateManager";
import type { DataStore } from "../../utils/DataStore";
import type { ViewPort } from "../../utils/ViewPort";
import type { EditManager } from "../EditManager";

export class EditMouseHandler implements IMouseHandler {
    constructor(
        private datastore: DataStore,
        private viewport: ViewPort,
        private coordManager: CoordinateManager,
        private editManager: EditManager
    ) {}

    onDblClick(event: MouseEvent): boolean {
        const row = this.coordManager.getRowFromY(event.offsetY);
        const column = this.coordManager.getColumnFromX(event.offsetX);

        if (row < 0 || column < 0) {
            return false;
        }

        const left = this.datastore.getColumnOffset(column) - this.viewport.getScrollX();
        const top = this.datastore.getRowOffset(row) - this.viewport.getScrollY();
        this.editManager.startEditing(
            row,
            column,
            left,
            top,
            this.datastore.getColumnWidth(column),
            this.datastore.getRowHeight(row)
        );
        return true;
    }
}
