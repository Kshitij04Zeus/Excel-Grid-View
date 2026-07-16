import { Constants } from "../utils/Constants";
import { ResizeState, ResizeType } from "../models/ResizeState";
import { ResizeColumnCommand } from "../commands/ResizeColumnCommand";
import { ResizeRowCommand } from "../commands/ResizeRowCommand";
export class ResizeManager {
    datastore;
    state = new ResizeState();
    constructor(datastore) {
        this.datastore = datastore;
    }
    isResizing() {
        return this.state.isResizing;
    }
    getState() {
        return this.state;
    }
    detectColumnResize(mouseX, scrollX) {
        const tolerance = 4;
        let currentX = Constants.HEADER_WIDTH - scrollX;
        const columns = this.datastore.getColumns();
        for (let i = 0; i < columns.length; i++) {
            currentX += this.datastore.getColumnWidth(i);
            if (Math.abs(mouseX - currentX) <= tolerance) {
                return i;
            }
        }
        return -1;
    }
    startColumnResize(column, mouseX) {
        this.state.isResizing = true;
        this.state.type = ResizeType.Column;
        this.state.index = column;
        this.state.startMouse = mouseX;
        this.state.originalSize = this.datastore.getColumnWidth(column);
    }
    startRowResize(row, mouseY) {
        this.state.isResizing = true;
        this.state.type = ResizeType.Row;
        this.state.index = row;
        this.state.startMouse = mouseY;
        this.state.originalSize = this.datastore.getRowHeight(row);
    }
    updateColumnResize(mouseX) {
        if (!this.state.isResizing) {
            return;
        }
        if (this.state.type !== ResizeType.Column) {
            return;
        }
        const difference = mouseX - this.state.startMouse;
        const newWidth = this.state.originalSize + difference;
        this.datastore.setColumnWidth(this.state.index, newWidth);
    }
    updateRowResize(mouseY) {
        if (!this.state.isResizing) {
            return;
        }
        if (this.state.type !== ResizeType.Row) {
            return;
        }
        const difference = mouseY - this.state.startMouse;
        const newHeight = this.state.originalSize + difference;
        this.datastore.setRowHeight(this.state.index, newHeight);
    }
    detectRowResize(mouseY, scrollY) {
        const tolerance = 4;
        let currentY = Constants.HEADER_HEIGHT - scrollY;
        const rows = this.datastore.getRows();
        for (let i = 0; i < rows.length; i++) {
            currentY += this.datastore.getRowHeight(i);
            if (Math.abs(mouseY - currentY) <= tolerance) {
                return i;
            }
        }
        return -1;
    }
    finishResize(onCommandCreated) {
        if (!this.state.isResizing || this.state.index === -1) {
            return;
        }
        const index = this.state.index;
        const originalSize = this.state.originalSize;
        if (this.state.type === ResizeType.Column) {
            const newWidth = this.datastore.getColumnWidth(index);
            if (originalSize !== newWidth && onCommandCreated) {
                const cmd = new ResizeColumnCommand(this.datastore, index, originalSize, newWidth, () => { });
                onCommandCreated(cmd);
            }
        }
        else if (this.state.type === ResizeType.Row) {
            const newHeight = this.datastore.getRowHeight(index);
            if (originalSize !== newHeight && onCommandCreated) {
                const cmd = new ResizeRowCommand(this.datastore, index, originalSize, newHeight, () => { });
                onCommandCreated(cmd);
            }
        }
        this.state.isResizing = false;
        this.state.type = ResizeType.None;
        this.state.index = -1;
    }
}
//# sourceMappingURL=ResizeManager.js.map