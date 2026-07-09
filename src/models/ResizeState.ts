export enum ResizeType
{
    None, Row, Column
}

export class ResizeState
{
    public isResizing = false;
    public type=ResizeType.None;
    public index=-1;
    public startMouse=0;
    public originalSize=0;
}