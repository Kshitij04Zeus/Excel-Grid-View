import type { DataStore } from "./DataStore";
import type { Selection } from "../models/Selection";
export interface CellStats {
    count: number;
    min: number;
    max: number;
    sum: number;
    average: number;
}
export declare class StatsCalculator {
    static calculate(selection: Selection, datastore: DataStore): CellStats | null;
    static formatNumber(num: number): string;
    private static isNumeric;
}
//# sourceMappingURL=StatsCalculator.d.ts.map