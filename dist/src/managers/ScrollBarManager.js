import { Constants } from "../utils/Constants";
export class ScrollBarManager {
    canvas;
    ctx;
    datastore;
    viewport;
    size = Constants.SCROLLBAR_SIZE;
    minThumbSize = Constants.MIN_SCROLLBAR_THUMB_SIZE;
    trackColor = Constants.SCROLLBAR_TRACK_COLOR;
    thumbColor = Constants.SCROLLBAR_THUMB_COLOR;
    hoverColor = Constants.SCROLLBAR_THUMB_HOVER;
    hoveringHorizontal = false;
    hoveringVertical = false;
    draggingHorizontal = false;
    draggingVertical = false;
    dragOffset = 0;
    constructor(canvas, ctx, datastore, viewport) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.datastore = datastore;
        this.viewport = viewport;
    }
    draw() {
        this.drawHorizontalScrollbar();
        this.drawVerticalScrollbar();
    }
    drawHorizontalScrollbar() {
        const trackX = Constants.HEADER_WIDTH;
        const trackY = this.canvas.height - this.size;
        const trackWidth = this.canvas.width
            - Constants.HEADER_WIDTH
            - this.size;
        const trackHeight = this.size;
        this.ctx.fillStyle = this.trackColor;
        this.ctx.fillRect(trackX, trackY, trackWidth, trackHeight);
        const thumb = this.getHorizontalThumb();
        this.ctx.fillStyle =
            this.hoveringHorizontal
                ? this.hoverColor
                : this.thumbColor;
        this.ctx.fillRect(thumb.x, thumb.y, thumb.width, thumb.height);
    }
    drawVerticalScrollbar() {
        const trackX = this.canvas.width - this.size;
        const trackY = Constants.HEADER_HEIGHT;
        const trackWidth = this.size;
        const trackHeight = this.canvas.height
            - Constants.HEADER_HEIGHT
            - this.size;
        this.ctx.fillStyle =
            this.trackColor;
        this.ctx.fillRect(trackX, trackY, trackWidth, trackHeight);
        const thumb = this.getVerticalThumb();
        this.ctx.fillStyle =
            this.hoveringVertical
                ? this.hoverColor
                : this.thumbColor;
        this.ctx.fillRect(thumb.x, thumb.y, thumb.width, thumb.height);
    }
    getHorizontalThumb() {
        const visibleWidth = this.canvas.width
            - Constants.HEADER_WIDTH
            - this.size;
        const totalWidth = this.datastore.getTotalWidth();
        const trackWidth = visibleWidth;
        const thumbWidth = Math.max(this.minThumbSize, (visibleWidth / totalWidth) * trackWidth);
        const maxScroll = Math.max(1, totalWidth - visibleWidth);
        const maxThumbTravel = trackWidth - thumbWidth;
        const thumbX = Constants.HEADER_WIDTH +
            (this.viewport.getScrollX() / maxScroll)
                * maxThumbTravel;
        return {
            x: thumbX,
            y: this.canvas.height - this.size,
            width: thumbWidth,
            height: this.size,
            maxScroll,
            maxThumbTravel
        };
    }
    getVerticalThumb() {
        const visibleHeight = this.canvas.height
            - Constants.HEADER_HEIGHT
            - this.size;
        const totalHeight = this.datastore.getTotalHeight();
        const trackHeight = visibleHeight;
        const thumbHeight = Math.max(this.minThumbSize, (visibleHeight / totalHeight)
            * trackHeight);
        const maxScroll = Math.max(1, totalHeight - visibleHeight);
        const maxThumbTravel = trackHeight - thumbHeight;
        const thumbY = Constants.HEADER_HEIGHT +
            (this.viewport.getScrollY() / maxScroll)
                * maxThumbTravel;
        return {
            x: this.canvas.width - this.size,
            y: thumbY,
            width: this.size,
            height: thumbHeight,
            maxScroll,
            maxThumbTravel
        };
    }
    mouseDown(mouseX, mouseY) {
        const horizontal = this.getHorizontalThumb();
        if (mouseX >= horizontal.x &&
            mouseX <= horizontal.x + horizontal.width &&
            mouseY >= horizontal.y &&
            mouseY <= horizontal.y + horizontal.height) {
            this.draggingHorizontal = true;
            this.dragOffset =
                mouseX - horizontal.x;
            return true;
        }
        const vertical = this.getVerticalThumb();
        if (mouseX >= vertical.x &&
            mouseX <= vertical.x + vertical.width &&
            mouseY >= vertical.y &&
            mouseY <= vertical.y + vertical.height) {
            this.draggingVertical = true;
            this.dragOffset =
                mouseY - vertical.y;
            return true;
        }
        return false;
    }
    mouseMove(mouseX, mouseY) {
        if (this.draggingHorizontal) {
            const thumb = this.getHorizontalThumb();
            const left = Constants.HEADER_WIDTH;
            let thumbPos = mouseX
                - left
                - this.dragOffset;
            thumbPos = Math.max(0, Math.min(thumb.maxThumbTravel, thumbPos));
            const scroll = (thumbPos / thumb.maxThumbTravel)
                * thumb.maxScroll;
            this.viewport.setScroll(scroll, this.viewport.getScrollY());
            return;
        }
        if (this.draggingVertical) {
            const thumb = this.getVerticalThumb();
            const top = Constants.HEADER_HEIGHT;
            let thumbPos = mouseY
                - top
                - this.dragOffset;
            thumbPos = Math.max(0, Math.min(thumb.maxThumbTravel, thumbPos));
            const scroll = (thumbPos / thumb.maxThumbTravel)
                * thumb.maxScroll;
            this.viewport.setScroll(this.viewport.getScrollX(), scroll);
        }
    }
    mouseUp() {
        this.draggingHorizontal = false;
        this.draggingVertical = false;
    }
    isDragging() {
        return this.draggingHorizontal
            || this.draggingVertical;
    }
}
//# sourceMappingURL=ScrollBarManager.js.map