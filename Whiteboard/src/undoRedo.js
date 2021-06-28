let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

undo.addEventListener("click", undoLine);
redo.addEventListener("click", redoLine);

// make undo btn disabled when no data
if(db.length == 0)
{
    document.querySelector("#undo").style.opacity = 0.2;
}

// make redo btn disabled when no data
if(redoDB.length == 0)
{
    document.querySelector("#redo").style.opacity = 0.2;
}

function undoLine()
{
    //1. pop a line from db
    let redoLine = db.pop();
    redoDB.push(redoLine);

    // make undo btn disabled when no data
    if(db.length == 0)
    {
        document.querySelector("#undo").style.opacity = 0.2;
    }
    //2. clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //3. redraw Lines
    redrawLine();
    redo.style.opacity = 1;
}

function redrawLine()
{
    ctx.lineCap = "round";
    for(let i = 0; i < db.length; i++)
    {
        let line = db[i];
        for(let j = 0; j < line.length; j++)
        {
            let pointObject = line[j];
            if(pointObject.type == "md")
            {
                ctx.strokeStyle = pointObject.color;
                ctx.lineWidth = pointObject.width;
                ctx.beginPath();
                ctx.moveTo(pointObject.x, pointObject.y);
            }

            else
            {
                ctx.lineTo(pointObject.x, pointObject.y);
                ctx.stroke();
            }
        }
    }
}

function redoLine()
{
    if(redoDB.length >= 1)
    {
        let line = redoDB.pop();
        if(redoDB.length == 0)
        {
            redo.style.opacity = 0.2;
        }
        for(let j = 0; j < line.length; j++)
        {
            let pointObject = line[j];
            if(pointObject.type == "md")
            {
                ctx.strokeStyle = pointObject.color;
                ctx.lineWidth = pointObject.width;
                ctx.beginPath();
                ctx.moveTo(pointObject.x, pointObject.y);
            }

            else
            {
                ctx.lineTo(pointObject.x, pointObject.y);
                ctx.stroke();
            }
        }
        db.push(line);
        if(db.length > 0)
        {
            undo.style.opacity = 1;
        }  
    }
}