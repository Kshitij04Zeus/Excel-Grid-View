export interface IMouseHandler {
    onMouseDown?(event: PointerEvent): boolean;
    onMouseMove?(event: PointerEvent): boolean;
    onMouseUp?(event: PointerEvent): void;
    onDblClick?(event: MouseEvent): boolean;
    onWheel?(event: WheelEvent): boolean;
    onHover?(event: PointerEvent): void; 
}
