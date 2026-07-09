import type { Command } from "./Command";
import type { DataStore } from "../utils/DataStore";

export class ResizeRowCommand implements Command {
    constructor(
        private datastore: DataStore,
        private row: number,
        private oldHeight: number,
        private newHeight: number,
        private onTriggerRender: () => void
    ) {}

    public execute(): void {
        this.datastore.setRowHeight(this.row, this.newHeight);
        this.onTriggerRender();
    }

    public undo(): void {
        this.datastore.setRowHeight(this.row, this.oldHeight);
        this.onTriggerRender();
    }
}
