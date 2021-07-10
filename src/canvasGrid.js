export const createCellDrawer = (ctx, width, height, defaultFillStyle) =>
    (x, y, fillStyle = defaultFillStyle) => {
        if (fillStyle === 'clear') {
            ctx.clearRect(x * width, y * height, width, height);
            return;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillRect(x * width + 1, y * height + 1, width - 2, height - 2);
    };

export const createClearRect = (ctx, defaultWidth, defaultHeight) => (x = 0, y = 0, width = defaultWidth, height = defaultHeight, ) => {
    ctx.clearRect(x, y, width, height);
}