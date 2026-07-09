import type { DataStore } from "./DataStore";
import type { Selection } from "../models/Selection";
import { Constants } from "./Constants";

export interface CellStats {
    count: number;
    min: number;
    max: number;
    sum: number;
    average: number;
}

export class StatsCalculator {
    public static calculate(selection: Selection, datastore: DataStore): CellStats | null {
        const numericValues: number[] = [];

        if (selection.selectedRow !== -1) {
            const r = selection.selectedRow;
            for (let c = 0; c < Constants.TOTAL_COLUMNS; c++) {
                const val = datastore.getCellValue(r, c);
                if (this.isNumeric(val)) {
                    numericValues.push(Number(val));
                }
            }
        } else if (selection.selectedColumn !== -1) {
            const c = selection.selectedColumn;
            for (let r = 0; r < Constants.TOTAL_ROWS; r++) {
                const val = datastore.getCellValue(r, c);
                if (this.isNumeric(val)) {
                    numericValues.push(Number(val));
                }
            }
        } else if (selection.range) {
            const minRow = Math.min(selection.range.startRow, selection.range.endRow);
            const maxRow = Math.max(selection.range.startRow, selection.range.endRow);
            const minCol = Math.min(selection.range.startColumn, selection.range.endColumn);
            const maxCol = Math.max(selection.range.startColumn, selection.range.endColumn);

            for (let r = minRow; r <= maxRow; r++) {
                for (let c = minCol; c <= maxCol; c++) {
                    const val = datastore.getCellValue(r, c);
                    if (this.isNumeric(val)) {
                        numericValues.push(Number(val));
                    }
                }
            }
        }

        if (numericValues.length === 0) {
            return null;
        }

        let sum = 0;
        let min = Infinity;
        let max = -Infinity;
        for (const num of numericValues) {
            sum += num;
            if (num < min) min = num;
            if (num > max) max = num;
        }
        const count = numericValues.length;
        const average = sum / count;

        return { count, min, max, sum, average };
    }

    public static formatNumber(num: number): string {
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }

    private static isNumeric(val: string): boolean {
        const trimmed = val.trim();
        if (trimmed === "") return false;
        return !isNaN(Number(trimmed));
    }
}
