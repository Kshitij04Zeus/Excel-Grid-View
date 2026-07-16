import { Column } from "../models/Column";
import { Row } from "../models/Row";
import { Constants } from "./Constants";
export class DataStore {
    rows = [];
    columns = [];
    editedCells = new Map();
    records = [];
    columnOffsets = [];
    rowOffsets = [];
    constructor() {
        this.initializeRows();
        this.initializeColumns();
        this.initializeOffsets();
    }
    initializeRows() {
        for (let i = 0; i < Constants.TOTAL_ROWS; i++) {
            this.rows.push(new Row(i, Constants.ROW_HEIGHT));
        }
    }
    initializeColumns() {
        for (let i = 0; i < Constants.TOTAL_COLUMNS; i++) {
            this.columns.push(new Column(i, Constants.COLUMN_WIDTH, this.getColumnName(i)));
        }
    }
    initializeOffsets() {
        this.columnOffsets = new Array(Constants.TOTAL_COLUMNS + 1);
        let x = Constants.HEADER_WIDTH;
        for (let i = 0; i <= Constants.TOTAL_COLUMNS; i++) {
            this.columnOffsets[i] = x;
            if (i < Constants.TOTAL_COLUMNS) {
                x += this.columns[i]?.width ?? Constants.COLUMN_WIDTH;
            }
        }
        this.rowOffsets = new Array(Constants.TOTAL_ROWS + 1);
        let y = Constants.HEADER_HEIGHT;
        for (let i = 0; i <= Constants.TOTAL_ROWS; i++) {
            this.rowOffsets[i] = y;
            if (i < Constants.TOTAL_ROWS) {
                y += this.rows[i]?.height ?? Constants.ROW_HEIGHT;
            }
        }
    }
    getColumnName(index) {
        let name = "";
        let value = index;
        while (value >= 0) {
            name = String.fromCharCode((value % 26) + 65) + name;
            value = Math.floor(value / 26) - 1;
        }
        return name;
    }
    getRows() {
        return this.rows;
    }
    getColumns() {
        return this.columns;
    }
    getRow(index) {
        return this.rows[index];
    }
    getColumn(index) {
        return this.columns[index];
    }
    getTotalWidth() {
        return (this.columnOffsets[Constants.TOTAL_COLUMNS] ?? 0) - Constants.HEADER_WIDTH;
    }
    getTotalHeight() {
        return (this.rowOffsets[Constants.TOTAL_ROWS] ?? 0) - Constants.HEADER_HEIGHT;
    }
    setCellValue(row, column, value) {
        this.editedCells.set(`${row}:${column}`, value);
    }
    getCellValue(row, column) {
        const key = `${row}:${column}`;
        if (this.editedCells.has(key)) {
            return this.editedCells.get(key) ?? "";
        }
        const record = this.getRecord(row);
        if (!record)
            return "";
        switch (column) {
            case 0: return record.id.toString();
            case 1: return record.firstName;
            case 2: return record.lastName;
            case 3: return record.Age.toString();
            case 4: return record.Salary.toString();
            default: return "";
        }
    }
    setRecords(records) {
        this.records = records;
    }
    getRecord(index) {
        return this.records[index] ?? null;
    }
    setColumnWidth(index, width) {
        const column = this.columns[index];
        if (column) {
            const oldWidth = column.width;
            const newWidth = Math.max(40, width);
            if (oldWidth !== newWidth) {
                column.width = newWidth;
                const diff = newWidth - oldWidth;
                for (let i = index + 1; i <= Constants.TOTAL_COLUMNS; i++) {
                    const val = this.columnOffsets[i];
                    if (val !== undefined) {
                        this.columnOffsets[i] = val + diff;
                    }
                }
            }
        }
    }
    setRowHeight(index, height) {
        const row = this.rows[index];
        if (row) {
            const oldHeight = row.height;
            const newHeight = Math.max(20, height);
            if (oldHeight !== newHeight) {
                row.height = newHeight;
                const diff = newHeight - oldHeight;
                for (let i = index + 1; i <= Constants.TOTAL_ROWS; i++) {
                    const val = this.rowOffsets[i];
                    if (val !== undefined) {
                        this.rowOffsets[i] = val + diff;
                    }
                }
            }
        }
    }
    getColumnWidth(index) {
        return this.columns[index]?.width ?? Constants.COLUMN_WIDTH;
    }
    getRowHeight(index) {
        return this.rows[index]?.height ?? Constants.ROW_HEIGHT;
    }
    getColumnOffset(column) {
        return this.columnOffsets[column] ?? Constants.HEADER_WIDTH;
    }
    getRowOffset(row) {
        return this.rowOffsets[row] ?? Constants.HEADER_HEIGHT;
    }
}
//# sourceMappingURL=DataStore.js.map