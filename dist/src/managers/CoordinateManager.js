import { Constants } from "../utils/Constants";
export class CoordinateManager {
    datastore;
    viewport;
    constructor(datastore, viewport) {
        this.datastore = datastore;
        this.viewport = viewport;
    }
    getColumnFromX(mouseX) {
        const absX = mouseX + this.viewport.getScrollX();
        if (absX < Constants.HEADER_WIDTH)
            return -1;
        let low = 0;
        let high = Constants.TOTAL_COLUMNS - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            const startX = this.datastore.getColumnOffset(mid);
            const endX = startX + this.datastore.getColumnWidth(mid);
            if (absX >= startX && absX < endX) {
                return mid;
            }
            else if (absX < startX) {
                high = mid - 1;
            }
            else {
                low = mid + 1;
            }
        }
        return -1;
    }
    getRowFromY(mouseY) {
        const absY = mouseY + this.viewport.getScrollY();
        if (absY < Constants.HEADER_HEIGHT)
            return -1;
        let low = 0;
        let high = Constants.TOTAL_ROWS - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            const startY = this.datastore.getRowOffset(mid);
            const endY = startY + this.datastore.getRowHeight(mid);
            if (absY >= startY && absY < endY) {
                return mid;
            }
            else if (absY < startY) {
                high = mid - 1;
            }
            else {
                low = mid + 1;
            }
        }
        return -1;
    }
}
//# sourceMappingURL=CoordinateManager.js.map