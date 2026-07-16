import { EditCellCommand } from "../commands/EditCellCommand";
import { FormulaEngine } from "../utils/FormulaEngine";
export class FormulaBarManager {
    datastore;
    selectionManager;
    commandManager;
    onRenderRequired;
    addressBox;
    formulaInput;
    formulaEditingOldValue = null;
    formulaEditingRow = -1;
    formulaEditingCol = -1;
    formulaEngine;
    constructor(datastore, selectionManager, commandManager, onRenderRequired) {
        this.datastore = datastore;
        this.selectionManager = selectionManager;
        this.commandManager = commandManager;
        this.onRenderRequired = onRenderRequired;
        this.formulaEngine = new FormulaEngine(this.datastore);
        this.initUI();
    }
    initUI() {
        this.addressBox = document.getElementById("addressBox");
        this.formulaInput = document.getElementById("formulaInput");
        this.formulaInput.addEventListener("focus", () => {
            const selection = this.selectionManager.getSelection();
            if (selection.activeCell) {
                this.formulaEditingRow = selection.activeCell.row;
                this.formulaEditingCol = selection.activeCell.column;
                this.formulaEditingOldValue = this.datastore.getCellValue(this.formulaEditingRow, this.formulaEditingCol);
            }
            else {
                this.formulaInput.blur();
            }
        });
        this.formulaInput.addEventListener("input", () => {
            if (this.formulaEditingRow !== -1 && this.formulaEditingCol !== -1) {
                this.datastore.setCellValue(this.formulaEditingRow, this.formulaEditingCol, this.formulaInput.value);
                this.onRenderRequired();
            }
        });
        this.formulaInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.formulaInput.blur();
            }
            else if (event.key === "Escape") {
                this.cancelFormulaEdit();
            }
        });
        this.formulaInput.addEventListener("blur", () => {
            this.commitFormulaEdit();
        });
    }
    commitFormulaEdit() {
        if (this.formulaEditingRow === -1 || this.formulaEditingCol === -1 || this.formulaEditingOldValue === null) {
            return;
        }
        let newValue = this.formulaInput.value;
        const oldValue = this.formulaEditingOldValue;
        if (newValue.startsWith("=")) {
            newValue = this.formulaEngine.evaluate(newValue).toString();
        }
        if (newValue !== oldValue) {
            this.datastore.setCellValue(this.formulaEditingRow, this.formulaEditingCol, newValue);
            const command = new EditCellCommand(this.datastore, this.formulaEditingRow, this.formulaEditingCol, oldValue, newValue, () => this.onRenderRequired());
            this.commandManager.pushExecutedCommand(command);
        }
        this.formulaEditingRow = -1;
        this.formulaEditingCol = -1;
        this.formulaEditingOldValue = null;
        this.onRenderRequired();
    }
    cancelFormulaEdit() {
        if (this.formulaEditingRow === -1 || this.formulaEditingCol === -1 || this.formulaEditingOldValue === null) {
            return;
        }
        this.datastore.setCellValue(this.formulaEditingRow, this.formulaEditingCol, this.formulaEditingOldValue);
        this.formulaInput.value = this.formulaEditingOldValue;
        this.formulaEditingRow = -1;
        this.formulaEditingCol = -1;
        this.formulaEditingOldValue = null;
        this.formulaInput.blur();
        this.onRenderRequired();
    }
    updateUI() {
        const selection = this.selectionManager.getSelection();
        const colActive = selection.activeCell;
        if (colActive) {
            const { row, column } = colActive;
            const colName = this.datastore.getColumnName(column);
            this.addressBox.textContent = `${colName}${row + 1}`;
            if (document.activeElement !== this.formulaInput) {
                this.formulaInput.value = this.datastore.getCellValue(row, column);
            }
        }
        else {
            this.addressBox.textContent = "-";
            this.formulaInput.value = "";
        }
    }
}
//# sourceMappingURL=FormulaBarManager.js.map