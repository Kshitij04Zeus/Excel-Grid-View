import type { Command } from "./Command";
import type { DataStore } from "../utils/DataStore";

export class EditCellCommand implements Command {
    constructor(
        private datastore: DataStore,
        private row: number,
        private column: number,
        private oldValue: string,
        private newValue: string,
        private onTriggerRender: () => void
    ) {}

    public execute(): void {
        this.datastore.setCellValue(this.row, this.column, this.newValue);
        this.onTriggerRender();
    }

    public undo(): void {
        this.datastore.setCellValue(this.row, this.column, this.oldValue);
        this.onTriggerRender();
    }
}
