import { Cell } from "../models/Cell";
import { DataStore } from "../utils/DataStore";
import { CommandManager } from "../commands/CommandManager";
import { EditCellCommand } from "../commands/EditCellCommand";
import { Constants } from "../utils/Constants";
export class EditManager {
    container;
    datastore;
    commandManager;
    onValueChanged;
    inputElement;
    editingCell = null;
    editingRow = -1;
    editingColumn = -1;
    constructor(container, datastore, commandManager, onValueChanged) {
        this.container = container;
        this.datastore = datastore;
        this.commandManager = commandManager;
        this.onValueChanged = onValueChanged;
        this.inputElement = document.createElement("input");
        Object.assign(this.inputElement.style, Constants.CELL_INPUT_STYLES);
        this.container.appendChild(this.inputElement);
        this.registerEvents();
    }
    registerEvents() {
        this.inputElement.addEventListener("blur", () => this.save());
        this.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.save();
            }
            if (event.key === "Escape") {
                this.cancel();
            }
        });
    }
    startEditing(row, column, left, top, width, height) {
        this.editingRow = row;
        this.editingColumn = column;
        this.inputElement.style.left = `${left}px`;
        this.inputElement.style.top = `${top}px`;
        this.inputElement.style.width = `${width + 1}px`;
        this.inputElement.style.height = `${height + 1}px`;
        this.inputElement.style.opacity = "1";
        this.inputElement.style.pointerEvents = "auto";
        this.inputElement.value = this.datastore.getCellValue(row, column);
        this.inputElement.style.display = "block";
        this.inputElement.focus();
        this.inputElement.select();
    }
    save() {
        if (this.editingRow < 0 || this.editingColumn < 0) {
            return;
        }
        const oldValue = this.datastore.getCellValue(this.editingRow, this.editingColumn);
        const newValue = this.inputElement.value;
        if (oldValue !== newValue) {
            const command = new EditCellCommand(this.datastore, this.editingRow, this.editingColumn, oldValue, newValue, this.onValueChanged);
            this.commandManager.pushExecutedCommand(command);
            this.datastore.setCellValue(this.editingRow, this.editingColumn, newValue);
        }
        this.hide();
        this.onValueChanged();
    }
    cancel() {
        this.hide();
    }
    updatePosition(scrollX, scrollY) {
        if (this.editingRow < 0 || this.editingColumn < 0)
            return;
        const left = this.datastore.getColumnOffset(this.editingColumn) - scrollX;
        const top = this.datastore.getRowOffset(this.editingRow) - scrollY;
        this.inputElement.style.left = `${left}px`;
        this.inputElement.style.top = `${top}px`;
        if (left < Constants.HEADER_WIDTH || top < Constants.HEADER_HEIGHT) {
            this.inputElement.style.opacity = "0";
            this.inputElement.style.pointerEvents = "none";
        }
        else {
            this.inputElement.style.opacity = "1";
            this.inputElement.style.pointerEvents = "auto";
        }
    }
    hide() {
        this.inputElement.style.display = "none";
        this.editingCell = null;
    }
}
//# sourceMappingURL=EditManager.js.map