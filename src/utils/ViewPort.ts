import { Constants } from "./Constants";
import type { DataStore } from "./DataStore";

export class ViewPort {
    private scrollX = 0;
    private scrollY = 0;

    constructor(private datastore: DataStore) {

    }

    public setScroll(x: number, y: number): void {
        this.scrollX = Math.max(0, x);
        this.scrollY = Math.max(0, y);
    }

    public getScrollX(): number {
        return this.scrollX;
    }
    public getScrollY(): number {
        return this.scrollY;
    }
    public getVisibleRows(canvasHeight: number) {
        const scrollY = this.scrollY;
        const totalRows = Constants.TOTAL_ROWS;

        // Binary search for the first visible row
        let start = 0;
        let low = 0;
        let high = totalRows - 1;
        const targetY = scrollY + Constants.HEADER_HEIGHT;

        while (low <= high) {
            const mid = (low + high) >> 1;
            const bottomY = this.datastore.getRowOffset(mid) + this.datastore.getRowHeight(mid);
            if (bottomY >= targetY) {
                start = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        let end = start;
        let visibleHeight = 0;
        while (end < totalRows && visibleHeight < canvasHeight + 100) {
            visibleHeight += this.datastore.getRowHeight(end);
            end++;
        }

        return { start, end };
    }

    public getVisibleColumns(canvasWidth: number) {
        const scrollX = this.scrollX;
        const totalCols = Constants.TOTAL_COLUMNS;

        let start = 0;
        let low = 0;
        let high = totalCols - 1;
        const targetX = scrollX + Constants.HEADER_WIDTH;

        while (low <= high) {
            const mid = (low + high) >> 1;
            const rightX = this.datastore.getColumnOffset(mid) + this.datastore.getColumnWidth(mid);
            if (rightX >= targetX) {
                start = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        let end = start;
        let visibleWidth = 0;
        while (end < totalCols && visibleWidth < canvasWidth + 100) {
            visibleWidth += this.datastore.getColumnWidth(end);
            end++;
        }

        return { start, end };
    }

}