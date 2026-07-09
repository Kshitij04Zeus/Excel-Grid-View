import type { ICommand } from "./ICommand";
import type { DataStore } from "../utils/DataStore";

export class ResizeColumnCommand implements ICommand {
    constructor(
        private datastore: DataStore,
        private column: number,
        private oldWidth: number,
        private newWidth: number,
        private onTriggerRender: () => void
    ) {}

    public execute(): void {
        this.datastore.setColumnWidth(this.column, this.newWidth);
        this.onTriggerRender();
    }

    public undo(): void {
        this.datastore.setColumnWidth(this.column, this.oldWidth);
        this.onTriggerRender();
    }
}
