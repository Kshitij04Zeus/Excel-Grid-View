import type { Cell } from "../models/Cell";
import { Column } from "../models/Column";
import type { Employee } from "../models/Employee";
import { Row } from "../models/Row";
import { Constants } from "./Constants";

export class DataStore {
    private rows: Row[] = [];
    private columns: Column[] = [];
    private editedCells = new Map<string, string>();
    private records: Employee[] = [];
    private columnOffsets: number[] = [];
    private rowOffsets: number[] = [];

    constructor() {
        this.initializeRows();
        this.initializeColumns();
        this.initializeOffsets();
    }

    private initializeRows(): void {
        for (let i = 0; i < Constants.TOTAL_ROWS; i++) {
            this.rows.push(new Row(i, Constants.ROW_HEIGHT));
        }
    }

    private initializeColumns(): void {
        for (let i = 0; i < Constants.TOTAL_COLUMNS; i++) {
            this.columns.push(new Column(i, Constants.COLUMN_WIDTH, this.getColumnName(i)));
        }
    }

    private initializeOffsets(): void {
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

    public getColumnName(index: number): string {
        let name = "";
        let value = index;
        while (value >= 0) {
            name = String.fromCharCode((value % 26) + 65) + name;
            value = Math.floor(value / 26) - 1;
        }
        return name;
    }

    public getRows(): Row[] {
        return this.rows;
    }

    public getColumns(): Column[] {
        return this.columns;
    }

    public getRow(index: number): Row | undefined {
        return this.rows[index];
    }

    public getColumn(index: number): Column | undefined {
        return this.columns[index];
    }

    public getTotalWidth(): number {
        return (this.columnOffsets[Constants.TOTAL_COLUMNS] ?? 0) - Constants.HEADER_WIDTH;
    }

    public getTotalHeight(): number {
        return (this.rowOffsets[Constants.TOTAL_ROWS] ?? 0) - Constants.HEADER_HEIGHT;
    }

    public setCellValue(row: number, column: number, value: string): void {
        this.editedCells.set(`${row}:${column}`, value);
    }

    public getCellValue(row: number, column: number): string {
        const key = `${row}:${column}`;
        if (this.editedCells.has(key)) {
            return this.editedCells.get(key) ?? "";
        }
        const record = this.getRecord(row);
        if (!record) return "";
        switch (column) {
            case 0: return record.id.toString();
            case 1: return record.firstName;
            case 2: return record.lastName;
            case 3: return record.Age.toString();
            case 4: return record.Salary.toString();
            default: return "";
        }
    }

    public setRecords(records: Employee[]): void {
        this.records = records;
    }

    public getRecord(index: number): Employee | null {
        return this.records[index] ?? null;
    }

    public setColumnWidth(index: number, width: number): void {
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

    public setRowHeight(index: number, height: number): void {
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

    public getColumnWidth(index: number): number {
        return this.columns[index]?.width ?? Constants.COLUMN_WIDTH;
    }

    public getRowHeight(index: number): number {
        return this.rows[index]?.height ?? Constants.ROW_HEIGHT;
    }

    public getColumnOffset(column: number): number {
        return this.columnOffsets[column] ?? Constants.HEADER_WIDTH;
    }

    public getRowOffset(row: number): number {
        return this.rowOffsets[row] ?? Constants.HEADER_HEIGHT;
    }
}