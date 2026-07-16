import { Column } from "../models/Column";
import type { Employee } from "../models/Employee";
import { Row } from "../models/Row";
export declare class DataStore {
    private rows;
    private columns;
    private editedCells;
    private records;
    private columnOffsets;
    private rowOffsets;
    constructor();
    private initializeRows;
    private initializeColumns;
    private initializeOffsets;
    getColumnName(index: number): string;
    getRows(): Row[];
    getColumns(): Column[];
    getRow(index: number): Row | undefined;
    getColumn(index: number): Column | undefined;
    getTotalWidth(): number;
    getTotalHeight(): number;
    setCellValue(row: number, column: number, value: string): void;
    getCellValue(row: number, column: number): string;
    setRecords(records: Employee[]): void;
    getRecord(index: number): Employee | null;
    setColumnWidth(index: number, width: number): void;
    setRowHeight(index: number, height: number): void;
    getColumnWidth(index: number): number;
    getRowHeight(index: number): number;
    getColumnOffset(column: number): number;
    getRowOffset(row: number): number;
}
//# sourceMappingURL=DataStore.d.ts.map