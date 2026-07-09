import { Cell } from "../models/Cell";
import { DataStore } from "../utils/DataStore";
import { CommandHistory } from "../commands/CommandManager";
import { EditCellCommand } from "../commands/EditCellCommand";
import { Constants } from "../utils/Constants";
 
export class EditManager 
{
    private inputElement: HTMLInputElement;
    private editingCell: Cell | null = null;
    private editingRow=-1;
    private editingColumn=-1;
 
    constructor(
        private readonly container: HTMLElement,
        private readonly datastore: DataStore,
        private readonly commandHistory: CommandHistory,
        private readonly onValueChanged: () => void
    ) 
    {
        this.inputElement = document.createElement("input"); 
        this.inputElement.type = "text"; 
        this.inputElement.style.position = "absolute"; 
        this.inputElement.style.display = "none"; 
        this.inputElement.style.border = "2px solid #107c41"; 
        this.inputElement.style.outline = "none"; 
        this.inputElement.style.backgroundColor = "#ffffff";
        this.inputElement.style.boxSizing = "border-box";
        this.inputElement.style.padding = "0 5px"; 
        this.inputElement.style.fontFamily = "Arial";
        this.inputElement.style.fontSize = "13px"; 
 
        this.container.appendChild(this.inputElement); 
        this.registerEvents();
    }
 
    private registerEvents(): void 
    { 
        this.inputElement.addEventListener(
            "blur",
            () => this.save()
        );
 
        this.inputElement.addEventListener(
            "keydown",
            (event: KeyboardEvent) => { 
                if (event.key === "Enter") { 
                    this.save(); 
                }
 
                if (event.key === "Escape") { 
                    this.cancel(); 
                } 
            }
        ); 
    }
 
    public startEditing(row:number, column:number, left: number, top: number, width: number, height: number): void 
    { 
        this.editingRow = row;
        this.editingColumn = column;
        this.inputElement.style.left = `${left}px`; 
        this.inputElement.style.top = `${top}px`; 
        this.inputElement.style.width = `${width + 1}px`; 
        this.inputElement.style.height = `${height + 1}px`; 
        this.inputElement.style.opacity = "1";
        this.inputElement.style.pointerEvents = "auto";
 
        this.inputElement.value = this.datastore.getCellValue(row,column); 
        this.inputElement.style.display = "block"; 
        this.inputElement.focus(); 
        this.inputElement.select();
    }
 
    private save(): void 
    { 
        if (this.editingRow<0 || this.editingColumn<0) { 
            return; 
        }
        const oldValue = this.datastore.getCellValue(this.editingRow, this.editingColumn);
        const newValue = this.inputElement.value;
        if (oldValue !== newValue) {
            const command = new EditCellCommand(
                this.datastore,
                this.editingRow,
                this.editingColumn,
                oldValue,
                newValue,
                this.onValueChanged
            );
            this.commandHistory.pushExecutedCommand(command);
            this.datastore.setCellValue(this.editingRow, this.editingColumn, newValue);
        }
        this.hide(); 
        this.onValueChanged();
    }
 
    public cancel(): void 
    { 
        this.hide(); 
    }

    public updatePosition(scrollX: number, scrollY: number): void {
        if (this.editingRow < 0 || this.editingColumn < 0) return;

        const left = this.datastore.getColumnOffset(this.editingColumn) - scrollX;
        const top = this.datastore.getRowOffset(this.editingRow) - scrollY;

        this.inputElement.style.left = `${left}px`;
        this.inputElement.style.top = `${top}px`;

        if (left < Constants.HEADER_WIDTH || top < Constants.HEADER_HEIGHT) {
            this.inputElement.style.opacity = "0";
            this.inputElement.style.pointerEvents = "none";
        } else {
            this.inputElement.style.opacity = "1";
            this.inputElement.style.pointerEvents = "auto";
        }
    }
 
    private hide(): void 
    { 
        this.inputElement.style.display = "none"; 
        this.editingCell = null; 
    }
 
}