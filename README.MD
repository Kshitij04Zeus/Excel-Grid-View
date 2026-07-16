# Excel Grid

## Objective
The objective of this project is to build a high-performance, Excel-like spreadsheet application using TypeScript and HTML5 Canvas. The application demonstrates advanced software architecture by rendering a virtualized grid capable of supporting 100,000 rows and 500 columns, managing state through the Command Pattern, and strictly adhering to Object-Oriented Programming (OOP) and SOLID design principles.

## How to Install and Run
1. Clone or download the repository the repository and navigate to the root directory:
    ```bash
    git clone https://github.com/Kshitij04Zeus/Excel-Grid-View
    cd .\Excel-Grid\
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server via
   ```bash
   npm run dev
   ```

# Features Implemented
 
- Canvas-based spreadsheet rendering
- Virtual rendering for 100,000 rows and 500 columns
- Horizontal and vertical scrolling
- Custom canvas scrollbars
- Cell editing
- Formula bar
- Formula evaluation
- Row selection
- Column selection
- Multi-cell range selection
- Keyboard navigation
- Variable row heights
- Variable column widths
- Row resizing
- Column resizing
- Undo functionality
- Redo functionality
- Status bar displaying:
  - Count
  - Sum
  - Average
  - Minimum
  - Maximum
- Efficient viewport calculation
- Coordinate mapping between mouse position and cells

## Folder and Class Structure
```text
src/
├── commands/
│   ├── CommandManager.ts
│   ├── EditCellCommand.ts
│   ├── ICommand.ts
│   ├── ResizeColumnCommand.ts
│   └── ResizeRowCommand.ts
├── interfaces/
│   ├── IDataStore.ts
│   ├── IFormulaEngine.ts
│   └── IMouseHandler.ts
├── managers/
│   ├── mouseHandlers/
│   │   ├── EditMouseHandler.ts
│   │   ├── ResizeMouseHandler.ts
│   │   ├── ScrollBarMouseHandler.ts
│   │   ├── ScrollMouseHandler.ts
│   │   └── SelectionMouseHandler.ts
│   ├── CoordinateManager.ts
│   ├── EditManager.ts
│   ├── FormulaBarManager.ts
│   ├── KeyboardManager.ts
│   ├── MouseManager.ts
│   ├── ResizeManager.ts
│   ├── ScrollBarManager.ts
│   ├── SelectionManager.ts
│   └── StatusBarManager.ts
├── models/
│   ├── Cell.ts
│   ├── CellRange.ts
│   ├── Column.ts
│   ├── Employee.ts
│   ├── ResizeState.ts
│   ├── Row.ts
│   └── Selection.ts
├── utils/
│   ├── Constants.ts
│   ├── DataStore.ts
│   ├── FormulaEngine.ts
│   ├── generate-data.ts
│   ├── Grid.ts
│   ├── Renderer.ts
│   ├── StatsCalculator.ts
│   └── ViewPort.ts
├── employees.json
├── main.ts
└── style.css
```

# OOP Concepts Applied

## Encapsulation
 
Each class encapsulates its own state and behavior.
 
Examples:
 
- DataStore manages all spreadsheet data.
- Renderer is responsible only for rendering.
- SelectionManager manages selection state.
- FormulaEngine performs only formula evaluation.
  
## Abstraction
 
Interfaces abstract implementation details.
 
Examples:
 - IFormulaEngine
- IMouseHandler
 
This allows different implementations without affecting dependent classes.
 
 
## Inheritance
 
Although the project primarily favors composition, all mouse handlers implement a common interface, enabling consistent behavior while providing specialized implementations.
  
## Polymorphism
 
MouseManager stores multiple implementations of IMouseHandler and invokes them uniformly.
 
Example:
 
```typescript
private handlers: IMouseHandler[]
```
 
Each handler independently decides whether it should process an event.
 
## Composition
 
The Grid class is composed of multiple independent managers.
 
Example:
 
```text
Grid
├── Renderer
├── DataStore
├── ViewPort
├── MouseManager
├── KeyboardManager
├── SelectionManager
├── FormulaBarManager
├── ScrollBarManager
└── StatusBarManager
```
 
Each component has a single responsibility.
 
 
# SOLID Principles Applied
 
## Single Responsibility Principle
 
Each class has one clearly defined responsibility.
 
Examples:
 
- Renderer only renders.
- FormulaEngine only evaluates formulas.
- SelectionManager only manages selections.
- StatusBarManager only updates status information.
  
## Open/Closed Principle
 
New mouse functionality can be added by implementing IMouseHandler without modifying MouseManager.
 
Examples:
 
- ScrollMouseHandler
- ResizeMouseHandler
- EditMouseHandler
- SelectionMouseHandler
- ScrollBarMouseHandler
  
## Liskov Substitution Principle
 
Every mouse handler can replace another because all conform to IMouseHandler.
  
## Interface Segregation Principle
 
Interfaces remain focused.
 
Examples:
- IMouseHandler
- IFormulaEngine
 
No class is forced to implement unnecessary methods.
  
## Dependency Inversion Principle
 
Managers depend on abstractions and injected dependencies instead of creating objects internally.
 
Example:
 
```typescript
constructor(
    private readonly datastore: DataStore,
    private readonly selectionManager: SelectionManager
)
```

# Command Pattern
 
The application uses the Command Pattern to implement Undo and Redo.
 
## Components
 
- ICommand
- CommandManager
- EditCellCommand
- ResizeColumnCommand
- ResizeRowCommand
 
Every user action is represented as an independent command object.
 
Each command stores:
 
- Previous value
- New value
- Execute operation
- Undo operation
 
The CommandManager maintains separate Undo and Redo stacks.
 
This design makes new undoable actions easy to add.

## How Virtual Rendering Works
Rendering 100,000 rows x 500 columns would freeze the browser if processed via the DOM. Instead, the application performs virtual rendering.
1. The ViewPort class determines: 
- First visible row
- Last visible row
- First visible column
- Last visible column
 
2. Only the visible cells are drawn by Renderer.
 
Benefits include:
 
- Low memory usage
- Fast rendering
- Smooth scrolling
- Constant rendering cost regardless of dataset size

## How Data is Generated and Loaded
Data generation is handled by a script (generateData.ts). Each record contains employee information such as:
 
- Id
- First Name
- Last Name
- Age
- Salary
 
The generated dataset can be stored in `employees.json`.
 
During application startup:
 
1. The employee records are generated.
2. The generated dataset is passed directly to DataStore.ts.
2. DataStore initializes row and column metadata.
3. Cached row and column offsets are created.
4. The renderer displays only the visible portion of the dataset.

## How Undo/Redo Works
Undo and Redo functionality is implemented using the Command Pattern.
 
Supported operations include:
 
- Cell editing
- Column resizing
- Row resizing
 
Each operation is stored as a command.
When an action occurs, it is passed to the CommandManager, which executes it and pushes it to an undoStack. When Ctrl+Z is pressed, the manager pops the command, calls its undo() method, and pushes it to a redoStack.

# Test Cases Covered
 
The application was tested for the following scenarios:
 
- Rendering 100,000 rows
- Rendering 500 columns
- Horizontal scrolling
- Vertical scrolling
- Custom scrollbar dragging
- Cell editing
- Formula bar editing
- Formula evaluation
- Row selection
- Column selection
- Range selection
- Row resizing
- Column resizing
- Undo cell edits
- Redo cell edits
- Undo row resize
- Undo column resize
- Keyboard navigation
- Status bar calculations
- Viewport rendering during scrolling
- Variable row heights
- Variable column widths

## Performance Observations
- Virtual rendering keeps rendering independent of dataset size.
- Binary search is used to determine visible rows and columns efficiently.
- Cached row and column offsets eliminate repeated calculations.
- Canvas rendering significantly reduces DOM overhead.
- Rendering performance remains smooth even for datasets containing 100,000 rows.

## Accessibility Considerations
* **Overcoming Canvas Limitations**: An HTML5 `<canvas>` looks like a flat image to a computer, making its grid invisible to screen readers. To fix this, we pop up a real HTML `<input>` box whenever you edit a cell so screen readers can read the text out loud.
* **Keyboard Navigation**: You can use the entire grid without ever touching a mouse. Use the Arrow keys to move around, hit `Enter` to type and save your work, and press `Escape` to cancel your changes. Use Shift plus arrow keys to Select Range of cells. 
* **Summary Status Bar**: The calculations bar (Count, Min, Max, Sum, Average) displays its results in standard HTML text elements outside the canvas.
* **Selection Accessibility**: We use thick, bold borders alongside colors to show which cells are selected, ensuring colorblind users can see their selection clearly.


## Known Limitations and Next Improvements
- No built-in support for custom cell formatting, or merging cells.
- Formulas are limited to a small set of functions(SUM,COUNT,MIN,MAX,Avg) and support only expressions for SUM.
- Not using persistent storage
- Multiple worksheets are not supported.
- Clipboard operations (Copy/Paste) are not implemented.