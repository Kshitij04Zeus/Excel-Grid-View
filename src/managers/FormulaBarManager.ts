import type { DataStore } from "../utils/DataStore";
import type { SelectionManager } from "../managers/SelectionManager";
import type { CommandManager } from "../commands/CommandManager";
import { EditCellCommand } from "../commands/EditCellCommand";
import { FormulaEngine } from "../utils/FormulaEngine";
import type { IFormulaEngine } from "../interfaces/IFormulaEngine";

export class FormulaBarManager {
    private addressBox!: HTMLDivElement;
    private formulaInput!: HTMLInputElement;

    private formulaEditingOldValue: string | null = null;
    private formulaEditingRow = -1;
    private formulaEditingCol = -1;
    private formulaEngine: IFormulaEngine;

    constructor(
        private readonly datastore: DataStore,
        private readonly selectionManager: SelectionManager,
        private readonly commandManager: CommandManager,
        private readonly onRenderRequired: () => void
    ) {
        this.formulaEngine = new FormulaEngine(this.datastore);
        this.initUI();
    }

    private initUI(): void {
        this.addressBox = document.getElementById("addressBox") as HTMLDivElement;
        this.formulaInput = document.getElementById("formulaInput") as HTMLInputElement;

        this.formulaInput.addEventListener("focus", () => {
            const selection = this.selectionManager.getSelection();
            if (selection.activeCell) {
                this.formulaEditingRow = selection.activeCell.row;
                this.formulaEditingCol = selection.activeCell.column;
                this.formulaEditingOldValue = this.datastore.getCellValue(this.formulaEditingRow, this.formulaEditingCol);
            } else {
                this.formulaInput.blur();
            }
        });

        this.formulaInput.addEventListener("input", () => {
            if (this.formulaEditingRow !== -1 && this.formulaEditingCol !== -1) {
                this.datastore.setCellValue(this.formulaEditingRow, this.formulaEditingCol, this.formulaInput.value);
                this.onRenderRequired();
            }
        });

        this.formulaInput.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                this.formulaInput.blur();
            } else if (event.key === "Escape") {
                this.cancelFormulaEdit();
            }
        });

        this.formulaInput.addEventListener("blur", () => {
            this.commitFormulaEdit();
        });
    }

    private commitFormulaEdit(): void {
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

            const command = new EditCellCommand(
                this.datastore,
                this.formulaEditingRow,
                this.formulaEditingCol,
                oldValue,
                newValue,
                () => this.onRenderRequired()
            );
            this.commandManager.pushExecutedCommand(command);
        }

        this.formulaEditingRow = -1;
        this.formulaEditingCol = -1;
        this.formulaEditingOldValue = null;
        this.onRenderRequired();
    }

    private cancelFormulaEdit(): void {
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

    public updateUI(): void {
        const selection = this.selectionManager.getSelection();
        const colActive = selection.activeCell;

        if (colActive) {
            const { row, column } = colActive;
            const colName = this.datastore.getColumnName(column);
            this.addressBox.textContent = `${colName}${row + 1}`;
            if (document.activeElement !== this.formulaInput) {
                this.formulaInput.value = this.datastore.getCellValue(row, column);
            }
        } else {
            this.addressBox.textContent = "-";
            this.formulaInput.value = "";
        }
    }   
}
