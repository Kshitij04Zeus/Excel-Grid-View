import { Constants } from "../utils/Constants";
import type { DataStore } from "../utils/DataStore";
import { ResizeState, ResizeType } from "../models/ResizeState";
import { ResizeColumnCommand } from "../commands/ResizeColumnCommand";
import { ResizeRowCommand } from "../commands/ResizeRowCommand";
import type { Command } from "../commands/Command";

export class ResizeManager {
    private readonly state = new ResizeState();

    constructor(
        private readonly datastore: DataStore
    ) { }

    public isResizing(): boolean {
        return this.state.isResizing;
    }

    public getState(): ResizeState {
        return this.state;
    }

    public detectColumnResize(
        mouseX: number,
        scrollX: number
    ): number {
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

    public startColumnResize(
        column: number,
        mouseX: number
    ): void {
        this.state.isResizing = true;
        this.state.type = ResizeType.Column;
        this.state.index = column;
        this.state.startMouse = mouseX;
        this.state.originalSize = this.datastore.getColumnWidth(column);
    }

    public startRowResize(
        row: number,
        mouseY: number
    ): void {
        this.state.isResizing = true;
        this.state.type = ResizeType.Row;
        this.state.index = row;
        this.state.startMouse = mouseY;
        this.state.originalSize = this.datastore.getRowHeight(row);
    }


    public updateColumnResize(
        mouseX: number
    ): void {
        if (!this.state.isResizing) {
            return;
        }
        if (this.state.type !== ResizeType.Column) {
            return;
        }
        const difference = mouseX - this.state.startMouse;
        const newWidth = this.state.originalSize + difference;
        this.datastore.setColumnWidth(
            this.state.index,
            newWidth
        );
    }

    public updateRowResize(
        mouseY: number
    ): void {
        if (!this.state.isResizing) {
            return;
        }
        if (this.state.type !== ResizeType.Row) {
            return;
        }
        const difference = mouseY - this.state.startMouse;
        const newHeight = this.state.originalSize + difference;
        this.datastore.setRowHeight(
            this.state.index,
            newHeight
        );
    }


    public detectRowResize(mouseY: number, scrollY: number): number {
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


    public finishResize(onCommandCreated?: (cmd: Command) => void): void {
        if (!this.state.isResizing || this.state.index === -1) {
            return;
        }

        const index = this.state.index;
        const originalSize = this.state.originalSize;

        if (this.state.type === ResizeType.Column) {
            const newWidth = this.datastore.getColumnWidth(index);
            if (originalSize !== newWidth && onCommandCreated) {
                const cmd = new ResizeColumnCommand(
                    this.datastore,
                    index,
                    originalSize,
                    newWidth,
                    () => {}
                );
                onCommandCreated(cmd);
            }
        } else if (this.state.type === ResizeType.Row) {
            const newHeight = this.datastore.getRowHeight(index);
            if (originalSize !== newHeight && onCommandCreated) {
                const cmd = new ResizeRowCommand(
                    this.datastore,
                    index,
                    originalSize,
                    newHeight,
                    () => {}
                );
                onCommandCreated(cmd);
            }
        }

        this.state.isResizing = false;
        this.state.type = ResizeType.None;
        this.state.index = -1;
    }
}
