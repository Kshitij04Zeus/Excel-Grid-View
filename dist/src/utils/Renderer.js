import { Constants } from "./Constants";
export class Renderer {
    ctx;
    canvas;
    datastore;
    viewport;
    selectionManager;
    constructor(ctx, canvas, datastore, viewport, selectionManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.datastore = datastore;
        this.viewport = viewport;
        this.selectionManager = selectionManager;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const scrollX = this.viewport.getScrollX();
        const scrollY = this.viewport.getScrollY();
        const visibleRows = this.viewport.getVisibleRows(this.canvas.height);
        const visibleCols = this.viewport.getVisibleColumns(this.canvas.width);
        this.drawGridCells(visibleRows, visibleCols, scrollX, scrollY);
        this.drawSelection();
        this.drawColumnHeaders(visibleCols, scrollX);
        this.drawRowHeaders(visibleRows, scrollY);
        this.drawTopLeftCorner();
    }
    drawGridCells(visibleRows, visibleCols, scrollX, scrollY) {
        const activeEditing = document.activeElement?.tagName === "INPUT" && document.activeElement?.id !== "formulaInput";
        const selection = this.selectionManager.getSelection();
        // crisp grid lines
        this.ctx.strokeStyle = Constants.GRID_LINE_COLOR;
        this.ctx.lineWidth = Constants.GRID_LINE_WIDTH;
        this.ctx.beginPath();
        // vertical grid lines
        for (let c = visibleCols.start; c <= visibleCols.end; c++) {
            const x = Math.floor(this.datastore.getColumnOffset(c) - scrollX) + 0.5;
            this.ctx.moveTo(x, Constants.HEADER_HEIGHT);
            this.ctx.lineTo(x, this.canvas.height);
        }
        // horizontal grid lines
        for (let r = visibleRows.start; r <= visibleRows.end; r++) {
            const y = Math.floor(this.datastore.getRowOffset(r) - scrollY) + 0.5;
            this.ctx.moveTo(Constants.HEADER_WIDTH, y);
            this.ctx.lineTo(this.canvas.width, y);
        }
        this.ctx.stroke();
        // cell values
        this.ctx.font = Constants.CELL_FONT;
        this.ctx.fillStyle = Constants.CELL_TEXT_COLOR;
        this.ctx.textBaseline = Constants.CELL_TEXT_BASELINE;
        for (let r = visibleRows.start; r < visibleRows.end; r++) {
            const row = this.datastore.getRow(r);
            if (!row)
                continue;
            const y = this.datastore.getRowOffset(r) - scrollY;
            for (let c = visibleCols.start; c < visibleCols.end; c++) {
                const col = this.datastore.getColumn(c);
                if (!col)
                    continue;
                if (activeEditing && selection.activeCell && selection.activeCell.row === r && selection.activeCell.column === c) {
                    continue;
                }
                const cellText = this.datastore.getCellValue(row.index, col.index);
                if (cellText !== "") {
                    const x = this.datastore.getColumnOffset(c) - scrollX;
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.rect(x + 1, y + 1, col.width - 2, row.height - 2);
                    this.ctx.clip();
                    this.ctx.fillText(cellText, x + 6, y + row.height / 2);
                    this.ctx.restore();
                }
            }
        }
        this.ctx.textBaseline = "alphabetic";
    }
    drawColumnHeaders(visibleCols, scrollX) {
        this.ctx.fillStyle = Constants.HEADER_BG_COLOR;
        this.ctx.fillRect(Constants.HEADER_WIDTH, 0, this.canvas.width, Constants.HEADER_HEIGHT);
        this.ctx.strokeStyle = Constants.HEADER_BORDER_COLOR;
        this.ctx.lineWidth = Constants.HEADER_BORDER_WIDTH;
        this.ctx.fillStyle = Constants.HEADER_TEXT_COLOR;
        this.ctx.font = Constants.HEADER_FONT;
        this.ctx.textAlign = Constants.HEADER_TEXT_ALIGN;
        this.ctx.textBaseline = Constants.HEADER_TEXT_BASELINE;
        this.ctx.beginPath();
        for (let c = visibleCols.start; c <= visibleCols.end; c++) {
            const x = Math.floor(this.datastore.getColumnOffset(c) - scrollX) + 0.5;
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, Constants.HEADER_HEIGHT);
        }
        this.ctx.moveTo(Constants.HEADER_WIDTH, Constants.HEADER_HEIGHT - 0.5);
        this.ctx.lineTo(this.canvas.width, Constants.HEADER_HEIGHT - 0.5);
        this.ctx.stroke();
        for (let c = visibleCols.start; c < visibleCols.end; c++) {
            const col = this.datastore.getColumn(c);
            if (!col)
                continue;
            const x = this.datastore.getColumnOffset(c) - scrollX;
            if (x + col.width >= Constants.HEADER_WIDTH) {
                this.ctx.fillText(col.title, x + (col.width / 2), Constants.HEADER_HEIGHT / 2);
            }
        }
        this.ctx.textAlign = Constants.COLUMN_TEXT_ALIGN;
        this.ctx.textBaseline = Constants.COLUMN_TEXT_BASELINE;
    }
    drawRowHeaders(visibleRows, scrollY) {
        this.ctx.fillStyle = Constants.HEADER_BG_COLOR;
        this.ctx.fillRect(0, Constants.HEADER_HEIGHT, Constants.HEADER_WIDTH, this.canvas.height);
        this.ctx.strokeStyle = Constants.HEADER_BORDER_COLOR;
        this.ctx.lineWidth = Constants.HEADER_BORDER_WIDTH;
        this.ctx.fillStyle = Constants.HEADER_TEXT_COLOR;
        this.ctx.font = Constants.HEADER_FONT;
        this.ctx.textAlign = Constants.HEADER_TEXT_ALIGN;
        this.ctx.textBaseline = Constants.HEADER_TEXT_BASELINE;
        this.ctx.beginPath();
        for (let r = visibleRows.start; r <= visibleRows.end; r++) {
            const y = Math.floor(this.datastore.getRowOffset(r) - scrollY) + 0.5;
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(Constants.HEADER_WIDTH, y);
        }
        this.ctx.moveTo(Constants.HEADER_WIDTH - 0.5, Constants.HEADER_HEIGHT);
        this.ctx.lineTo(Constants.HEADER_WIDTH - 0.5, this.canvas.height);
        this.ctx.stroke();
        //row index labels
        for (let r = visibleRows.start; r < visibleRows.end; r++) {
            const row = this.datastore.getRow(r);
            if (!row)
                continue;
            const y = this.datastore.getRowOffset(r) - scrollY;
            const rHeight = this.datastore.getRowHeight(r);
            if (y + rHeight >= Constants.HEADER_HEIGHT) {
                this.ctx.fillText((row.index + 1).toString(), Constants.HEADER_WIDTH / 2, y + (rHeight / 2));
            }
        }
        this.ctx.textAlign = Constants.ROW_TEXT_RESET_ALIGN;
        this.ctx.textBaseline = Constants.ROW_TEXT_RESET_BASELINE;
    }
    drawTopLeftCorner() {
        this.ctx.fillStyle = Constants.CORNER_BG_COLOR;
        this.ctx.fillRect(0, 0, Constants.HEADER_WIDTH, Constants.HEADER_HEIGHT);
        this.ctx.strokeStyle = Constants.CORNER_BORDER_COLOR;
        this.ctx.lineWidth = Constants.CORNER_BORDER_WIDTH;
        this.ctx.strokeRect(0.5, 0.5, Constants.HEADER_WIDTH - 1, Constants.HEADER_HEIGHT - 1);
    }
    drawSelection() {
        const selection = this.selectionManager.getSelection();
        const scrollX = this.viewport.getScrollX();
        const scrollY = this.viewport.getScrollY();
        if (selection.selectedRow !== -1) {
            const y = this.datastore.getRowOffset(selection.selectedRow) - scrollY;
            const rowHeight = this.datastore.getRowHeight(selection.selectedRow);
            if (y >= Constants.HEADER_HEIGHT && y < this.canvas.height) {
                this.ctx.fillStyle = Constants.SELECTION_FILL_COLOR;
                this.ctx.fillRect(Constants.HEADER_WIDTH, y, this.canvas.width - Constants.HEADER_WIDTH, rowHeight);
                this.ctx.strokeStyle = Constants.SELECTION_LINE_COLOR;
                this.ctx.lineWidth = Constants.SELECTION_ROW_COL_LINE_WIDTH;
                this.ctx.beginPath();
                this.ctx.moveTo(Constants.HEADER_WIDTH, y + 0.5);
                this.ctx.lineTo(this.canvas.width, y + 0.5);
                this.ctx.moveTo(Constants.HEADER_WIDTH, y + rowHeight - 0.5);
                this.ctx.lineTo(this.canvas.width, y + rowHeight - 0.5);
                this.ctx.stroke();
            }
            return;
        }
        if (selection.selectedColumn !== -1) {
            const x = this.datastore.getColumnOffset(selection.selectedColumn) - scrollX;
            const columnWidth = this.datastore.getColumnWidth(selection.selectedColumn);
            if (x >= Constants.HEADER_WIDTH && x < this.canvas.width) {
                this.ctx.fillStyle = Constants.SELECTION_FILL_COLOR;
                this.ctx.fillRect(x, Constants.HEADER_HEIGHT, columnWidth, this.canvas.height - Constants.HEADER_HEIGHT);
                this.ctx.strokeStyle = Constants.SELECTION_LINE_COLOR;
                this.ctx.lineWidth = Constants.SELECTION_ROW_COL_LINE_WIDTH;
                this.ctx.beginPath();
                this.ctx.moveTo(x + 0.5, Constants.HEADER_HEIGHT);
                this.ctx.lineTo(x + 0.5, this.canvas.height);
                this.ctx.moveTo(x + columnWidth - 0.5, Constants.HEADER_HEIGHT);
                this.ctx.lineTo(x + columnWidth - 0.5, this.canvas.height);
                this.ctx.stroke();
            }
            return;
        }
        if (!selection.range) {
            return;
        }
        const minRow = Math.min(selection.range.startRow, selection.range.endRow);
        const maxRow = Math.max(selection.range.startRow, selection.range.endRow);
        const minCol = Math.min(selection.range.startColumn, selection.range.endColumn);
        const maxCol = Math.max(selection.range.startColumn, selection.range.endColumn);
        const x = this.datastore.getColumnOffset(minCol) - scrollX;
        const y = this.datastore.getRowOffset(minRow) - scrollY;
        const isEditingInFormulaBar = document.activeElement?.id === "formulaInput";
        let width = 0;
        for (let i = minCol; i <= maxCol; i++) {
            width += this.datastore.getColumnWidth(i);
        }
        let height = 0;
        for (let i = minRow; i <= maxRow; i++) {
            height += this.datastore.getRowHeight(i);
        }
        if (!isEditingInFormulaBar) {
            this.ctx.fillStyle = Constants.SELECTION_FILL_COLOR;
            this.ctx.fillRect(x, y, width, height);
            this.ctx.strokeStyle = Constants.SELECTION_LINE_COLOR;
            this.ctx.lineWidth = Constants.SELECTION_RANGE_LINE_WIDTH;
            this.ctx.strokeRect(x, y, width, height);
        }
        const activeEditing = document.activeElement?.tagName === "INPUT" && !isEditingInFormulaBar;
        if (selection.activeCell && !activeEditing) {
            const acX = this.datastore.getColumnOffset(selection.activeCell.column) - scrollX;
            const acY = this.datastore.getRowOffset(selection.activeCell.row) - scrollY;
            const cellWidth = this.datastore.getColumnWidth(selection.activeCell.column);
            const cellHeight = this.datastore.getRowHeight(selection.activeCell.row);
            this.ctx.fillStyle = Constants.ACTIVE_CELL_BG_COLOR;
            this.ctx.fillRect(acX + 1.5, acY + 1.5, cellWidth - 3, cellHeight - 3);
            const text = this.datastore.getCellValue(selection.activeCell.row, selection.activeCell.column);
            this.ctx.fillStyle = Constants.CELL_TEXT_COLOR;
            this.ctx.font = Constants.CELL_FONT;
            this.ctx.textBaseline = Constants.CELL_TEXT_BASELINE;
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(acX + 1.5, acY + 1.5, cellWidth - 3, cellHeight - 3);
            this.ctx.clip();
            this.ctx.fillText(text, acX + 6, acY + cellHeight / 2);
            this.ctx.restore();
            this.ctx.textBaseline = Constants.ACTIVE_CELL_RESET_BASELINE;
        }
    }
}
//# sourceMappingURL=Renderer.js.map