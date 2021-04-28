let todoInput = document.querySelector(".todo-input");
let addTodoBtn = document.querySelector(".add-todo");
let todosList = document.querySelector(".todos-list");

function addTodo()
{
    let todo = todoInput.value;
    if(todo)
    {
        let liTag = document.createElement("li");
        liTag.classList.add("todo-item");

        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML = todo;

        // delete button and it's function to delete the todo
        // delete li tag which contains the todo item
        let btnTag = document.createElement("button");
        btnTag.classList.add("delete-todo");
        btnTag.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
        btnTag.addEventListener("click", function(e){
            e.target.parentNode.remove();
            console.log("Delete clicked");
        });
    
        liTag.append(pTag);
        liTag.append(btnTag);
        todosList.append(liTag);
        todoInput.value = "";   
    }
}

addTodoBtn.addEventListener("click", function()
{
    addTodo();
    console.log("To do created !");
})

todoInput.addEventListener("keypress", function(e){
    if(e.key == "Enter")
    {
        addTodo();
    }
});