import { SelectionManager } from "./SelectionManager"
import { CommandManager } from "../commands/CommandManager";
import { ViewPort } from "../utils/ViewPort";
import type { DataStore } from "../utils/DataStore";
import { Constants } from "../utils/Constants";

export class KeyboardManager {
    constructor(
        private readonly selection: SelectionManager,
        private readonly commandManager: CommandManager,
        private readonly datastore: DataStore,
        private readonly viewport: ViewPort,
        private readonly canvas: HTMLCanvasElement,
        private readonly render: () => void
    ) {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (document.activeElement?.tagName === "INPUT") {
            return;
        }
        if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
            if (event.key.toLowerCase() === "z") {
                event.preventDefault();
                this.commandManager.undo();
                this.render();
            } else if (event.key.toLowerCase() === "y") {
                event.preventDefault();
                this.commandManager.redo();
                this.render();
            }
        } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "z") {
            event.preventDefault();
            this.commandManager.redo();
            this.render();
        }

        const range = this.selection.getRange();
        if (!range) return;

        let row = range.startRow;
        let column = range.startColumn;
        let endRow = range.endRow;
        let endCol = range.endColumn;

        // console.log(event.key);
        switch (event.key) {
            case "ArrowUp":
                if (event.shiftKey) endRow = Math.max(0, endRow - 1);
                else {
                    row = Math.max(0, row - 1);
                    endRow = row;
                }
                break;

            case "ArrowDown":
                if (event.shiftKey) endRow = Math.min(Constants.TOTAL_ROWS - 1, endRow + 1);
                else {
                    row = Math.min(Constants.TOTAL_ROWS - 1, row + 1);
                    endRow = row;
                }
                break;

            case "ArrowLeft":
                if (event.shiftKey) endCol = Math.max(0, endCol - 1);
                else 
                {
                    column = Math.max(0, column - 1);
                    endCol=column;
                }
                break;

            case "ArrowRight":
                if (event.shiftKey) endCol = Math.min(Constants.TOTAL_COLUMNS - 1, endCol + 1);
                else
                {
                    column = Math.min(Constants.TOTAL_COLUMNS - 1, column + 1);
                    endCol=column;
                }
                break;

            case "Enter":
                if (event.shiftKey) {
                    row = Math.max(0, row - 1);
                }
                else {
                    row = Math.min(Constants.TOTAL_ROWS - 1, row + 1);
                }
                break;

            case "Tab":
                if (event.shiftKey) {
                    column = Math.max(0, column - 1);
                }
                else {
                    column = Math.min(Constants.TOTAL_COLUMNS - 1, column + 1);
                }
                break;
            default: return;
        }

        event.preventDefault();

        this.selection.startSelection(row, column);
        this.selection.updateSelection(endRow, endCol);
        this.selection.finishSelection();

        const targetRow = event.shiftKey ? endRow : row;
        const targetCol = event.shiftKey ? endCol : column;
        this.scrollIntoView(targetRow, targetCol);
        this.render();
    }

    private scrollIntoView(row: number, column: number): void {
        const cellLeft = this.datastore.getColumnOffset(column);
        const cellRight = this.datastore.getColumnOffset(column + 1);
        const cellTop = this.datastore.getRowOffset(row);
        const cellBottom = this.datastore.getRowOffset(row + 1);

        const currentScrollX = this.viewport.getScrollX();
        const currentScrollY = this.viewport.getScrollY();

        const viewWidth = this.canvas.width;
        const viewHeight = this.canvas.height;

        const usableWidth = viewWidth - Constants.HEADER_WIDTH;
        const usableHeight = viewHeight - Constants.HEADER_HEIGHT;

        let nextScrollX = currentScrollX;
        let nextScrollY = currentScrollY;

        if (cellRight > currentScrollX + usableWidth) {
            nextScrollX = cellRight - usableWidth;
        } else if (cellLeft < currentScrollX + Constants.HEADER_WIDTH) {
            nextScrollX = cellLeft - Constants.HEADER_WIDTH;
        }

        if (cellBottom > currentScrollY + usableHeight) {
            nextScrollY = cellBottom - usableHeight;
        } else if (cellTop < currentScrollY + Constants.HEADER_HEIGHT) {
            nextScrollY = cellTop - Constants.HEADER_HEIGHT;
        }

        this.viewport.setScroll(Math.max(0, nextScrollX), Math.max(0, nextScrollY));
    }
}