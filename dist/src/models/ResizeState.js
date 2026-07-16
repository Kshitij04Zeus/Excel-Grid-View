export var ResizeType;
(function (ResizeType) {
    ResizeType[ResizeType["None"] = 0] = "None";
    ResizeType[ResizeType["Row"] = 1] = "Row";
    ResizeType[ResizeType["Column"] = 2] = "Column";
})(ResizeType || (ResizeType = {}));
export class ResizeState {
    isResizing = false;
    type = ResizeType.None;
    index = -1;
    startMouse = 0;
    originalSize = 0;
}
//# sourceMappingURL=ResizeState.js.map