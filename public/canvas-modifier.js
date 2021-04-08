const interpretDrawCommand = function(drawCommand, drawingContext) {
    const x = drawCommand.x;
    const y = drawCommand.y;
    const xPrevious = drawCommand.xPrevious;
    const yPrevious = drawCommand.yPrevious;
    const color = drawCommand.color;
    const diameter = drawCommand.diameter;
    const radius = drawCommand.diameter / 2;

    drawingContext.fillStyle = color;
    drawingContext.strokeStyle = color;

    if (xPrevious == -1) {
        drawingContext.beginPath();
        drawingContext.arc(x, y, radius, 0, 2 * Math.PI, false);
        drawingContext.fill();
    } else {
        drawingContext.beginPath();
        drawingContext.arc(xPrevious, yPrevious, radius, 0, 2 * Math.PI, false);
        drawingContext.fill();

        drawingContext.beginPath();
        drawingContext.moveTo(xPrevious, yPrevious);
        drawingContext.lineTo(x, y);
        drawingContext.lineWidth = diameter;
        drawingContext.stroke();

        drawingContext.beginPath();
        drawingContext.arc(x, y, radius, 0, 2 * Math.PI, false);
        drawingContext.fill()
    }
}

if (typeof module != 'undefined') {
    module.exports = interpretDrawCommand;
}
