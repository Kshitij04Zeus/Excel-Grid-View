export interface IMouseHandler {
    onMouseDown?(event: MouseEvent): boolean;
    onMouseMove?(event: MouseEvent): boolean;
    onMouseUp?(event: MouseEvent): boolean;
    onDblClick?(event: MouseEvent): boolean;
    onWheel?(event: WheelEvent): boolean;
}
