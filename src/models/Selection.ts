import type { Cell } from "./Cell";
import type { CellRange } from "./CellRange";

export class Selection
{
    constructor(public activeCell:Cell | null=null, public range:CellRange|null=null, public selectedRow:number=-1,
        public selectedColumn:number=-1
    )
    {
        
    }
}