let redoBtn = document.querySelector("#redo");
let canvas = document.querySelector("#canvas");
let {top: canvasTop} = canvas.getBoundingClientRect();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (canvasTop + 5);
window.addEventListener("resize", function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - (canvasTop + 5);
    redrawLine();   // to stop canvas reset when resizing 
})

// undo redo
let db = [];
let line = [];
let redoDB = [];

// drawing on canvas
let ctx = canvas.getContext("2d");
ctx.lineCap = "round";
let isMouseDown = false;
canvas.addEventListener("mousedown", function(e)
{
    if(redoDB.length)
    {
        redoDB = [];
        redoBtn.style.opacity = 0.2;
    }

    isMouseDown = true;
    let x = e.clientX;
    let y = e.clientY - (canvasTop + 5);
    ctx.beginPath();
    ctx.moveTo(x, y);

    // mouse down obj for a line
    let pointObject = 
    {
        type: "md",
        x : x,
        y : y,
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }

    line.push(pointObject);
})

canvas.addEventListener("mousemove", function(e){

    if(isMouseDown)
    {
        document.querySelector("#undo").style.opacity = 1;
        let x = e.clientX;
        let y = e.clientY - (canvasTop + 5);
        ctx.lineTo(x, y);
        ctx.stroke();

        // mouse move object
        let pointObject = 
        {
            type: "mm",
            x : x,
            y : y,
        }
    
        line.push(pointObject);
    }
})

canvas.addEventListener("mouseup", function(e)
{
    isMouseDown = false;
    db.push(line);
    line = [];
})