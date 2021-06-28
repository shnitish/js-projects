let zoomIn = document.querySelector("#zoomIn");
let zoomOut = document.querySelector("#zoomOut");
let maxZoom = 1.5;

zoomIn.addEventListener("click", zoomInCanvas);
zoomOut.addEventListener("click", zoomOutCanvas)
function zoomInCanvas()
{
    if (currZoom + 0.1 <= maxZoom)
    {
        currZoom += 0.1;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(currZoom, currZoom);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawLine();
    }
}

function zoomOutCanvas()
{
    currZoom = 1;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(currZoom - 0.1, currZoom - 0.1);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawLine();
}