let filterCodes = {
    "pink": "#ff7979",
    "blue": "#686de0",
    "green": "#6ab04c",
    "grey": "#535c68"
}

// default selected filter for choosing color in modal
let selectedFilter = "grey";

let ticketFilters = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".ticket-container");
let openModalBtn = document.querySelector(".open-modal");
let closeModalBtn = document.querySelector(".close-modal");
let search = document.querySelector(".search");
let ticketDelete = document.querySelector(".ticket-delete");


openModalBtn.addEventListener("click", handleOpenModal);
closeModalBtn.addEventListener("click", handleCloseModal)

// toggle ticket filter change
function toggleTicketFilter(e)
{
    let filters = ["pink", "blue", "green", "grey"];
    let currentFilter = e.target.classList[1];
    let idx = filters.indexOf(currentFilter);
    idx++;
    idx = idx % filters.length;

    let currentTicket = e.target;
    currentTicket.classList.remove(currentFilter);
    currentTicket.classList.add(filters[idx]);

    // update this filter change on local storage of this particular ticket id
    let id = currentTicket.nextElementSibling.children[0].innerText.split('#')[1];

    // get localstorage
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    for(let i = 0; i < allTickets.length; i++)
    {
        if(allTickets[i].ticketId == id)
        {
            allTickets[i].ticketFilter = filters[idx];
        }
    }

    // set this data 
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
}

// handling ticket deletion
function handleTicketDelete(e)
{
    let ticketToBeDeleted = e.target.id;

    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let filteredTickets = allTickets.filter(function(ticketObject){
        return ticketObject.ticketId != ticketToBeDeleted;
    })

    localStorage.setItem("allTickets", JSON.stringify(filteredTickets));
    loadTickets();
}

// handle search bar 
function handleSearch()
{
    let ticketId = document.querySelector(".search").value;

    // load all tickets if there is no string to search in bar
    if(ticketId == "")
    {
        loadTickets();
        return;
    }

    // retrieve matching tickets
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter(function(filterObject)
        {
            return filterObject.ticketId.toLowerCase() == ticketId.toLowerCase();
        });

        ticketContainer.innerHTML = "";

        // show the matching tickets to the ticketId entered
        for(let i = 0; i < filteredTickets.length; i++)
        {
            let {ticketId, ticketFilter, ticketContent} = filteredTickets[i];
            // add ticket to UI code
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = `<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-content">${ticketContent}</div>`;
    
            // append ticket to the UI/ ticket container
            ticketContainer.append(ticketDiv);
        }
}

// retrieve all tickets if any, 
// then append make and append these tickets to UI
function loadTickets()
{
    if(localStorage.getItem("allTickets"))
    {
        ticketContainer.innerHTML = "";
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        for(let i = 0; i < allTickets.length; i++)
        {
            let {ticketId, ticketFilter, ticketContent} = allTickets[i];
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = `<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete">
            <i class="fas fa-trash-alt" id=${ticketId}></i>
            </div>
            </div>
            <div class="ticket-content">${ticketContent}</div>`;
            
            ticketDiv.querySelector(".ticket-filter").addEventListener("click", toggleTicketFilter);
            ticketDiv.querySelector(".ticket-delete i").addEventListener("click", handleTicketDelete);
            // append ticket to the UI/ ticket container
            ticketContainer.append(ticketDiv);
        }
    }
}
loadTickets();

// handling modal opening 
function handleOpenModal(e)
{
    // if modal already exits then return
    if(document.querySelector(".modal"))
    {
        return;
    }

    // else create a new modal
    let modalDiv = createModal();

    // to clear modal text
    modalDiv.querySelector(".modal-textbox").addEventListener("click", clearModalTextBox);

    // to add ticket when enter is pressed on the modal
    modalDiv.querySelector(".modal-textbox").addEventListener("keypress", addTicket);

    // set filter color in the modal and add click event on every modal filter
    let allModalFilters = modalDiv.querySelectorAll(".modal-filter");
    for(let i = 0; i < allModalFilters.length; i++)
    {
        allModalFilters[i].addEventListener("click", chooseModalFilter);
    }

    // append modal div on the UI/ ticket container
    ticketContainer.append(modalDiv);
}

// handle modal closing
function handleCloseModal(e)
{
    if(document.querySelector(".modal"))
    {
        document.querySelector(".modal").remove();
    }
}

// create a new modal 
function createModal()
{
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    modalDiv.innerHTML = `<div class="modal-textbox" data-typed = "false" contenteditable="true">
    Enter text here
</div>
<div class="modal-filter-options">
    <div class="modal-filter pink"></div>
    <div class="modal-filter blue"></div>
    <div class="modal-filter green"></div>
    <div class="modal-filter grey active-filter"></div>
</div>`;
    return modalDiv;
}

// handle selected modal filter color
function chooseModalFilter(e)
{
    // get the filter name which is clicked
    let selectedModalFilter = e.target.classList[1];
    if(selectedModalFilter == selectedFilter)
    {
        return;
    }

    // if selected modal filter is not the default filter then
    // remove the active filter class and add it to the new selected filter
    selectedFilter = selectedModalFilter;
    document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
    e.target.classList.add("active-filter");
}

// add ticket to the ticket container
function addTicket(e)
{
    if(e.key == "Enter")
    {
        // generate uniqure id for tickets
        let ticketId = uid();

        // get text from the modal div textbox and 
        // create a new div and replace the content in it
        let modalText = e.target.textContent;
        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        ticketDiv.innerHTML = `<div class="ticket-filter ${selectedFilter}"></div>
        <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete">
            <i class="fas fa-trash-alt" id=${ticketId}></i>
            </div>
            </div>
        <div class="ticket-content">${modalText}</div>`;
        
        ticketDiv.querySelector(".ticket-filter").addEventListener("click", toggleTicketFilter);
        ticketDiv.querySelector(".ticket-delete").addEventListener("click", handleTicketDelete);
        // append ticket to the UI/ ticket container
        ticketContainer.append(ticketDiv);

        // exit modal box from the UI
        e.target.parentNode.remove();

        // save tickets to local storage
        // after ticket appended to the document
        
        // if tickets never initialized before
        if(!localStorage.getItem("allTickets"))
        {
            let allTickets = [];
            let ticketObject = {};

            ticketObject.ticketId = ticketId;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = modalText;
            allTickets.push(ticketObject);

            localStorage.setItem("allTickets", JSON.stringify(allTickets));
        }

        // already some tickets are present
        else
        {
            let allTickets = JSON.parse(localStorage.getItem("allTickets"));
            let ticketObject = {};
            ticketObject.ticketId = ticketId;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = modalText;
            allTickets.push(ticketObject);
      
            localStorage.setItem("allTickets" , JSON.stringify(allTickets));
        }

        // again set default color to grey
        selectedFilter = "grey";
    }
}

// Clear modal placeholder text
function clearModalTextBox(e)
{
    if(e.target.getAttribute("data-typed") == "true")
    {
        return;
    }
    e.target.innerHTML = "";
    e.target.setAttribute("data-typed", "true");
}

// handle ticket container background color and filtering
for(var i = 0; i < ticketFilters.length; i++)
{
    ticketFilters[i].addEventListener("click", chooseFilter);
}

// handle ticket container background color and filtering
function chooseFilter(e)
{
    // if UI shows sorted tickets acc to filter selected
    if(e.target.classList.contains("active-filter"))
    {
        e.target.classList.remove("active-filter");
        loadTickets();
        return;
    }
    // remove active filter class from already selected filter
    if(document.querySelector(".filter.active-filter"))
    {
        document.querySelector(".filter.active-filter").classList.remove("active-filter");
    }
    e.target.classList.add("active-filter");

    // filter tickets
    let ticketFilter = e.target.classList[1];
    loadSelectedTickets(ticketFilter);
}

// filter tickets based on the chosen color
function loadSelectedTickets(ticketFilter)
{
    if(localStorage.getItem("allTickets"))
    {
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter(function(filterObject)
        {
            return filterObject.ticketFilter == ticketFilter;
        });

        ticketContainer.innerHTML = "";

        // add tickets/ show on the UI based on the color clicked 
        for(let i = 0; i < filteredTickets.length; i++)
        {
            let {ticketId, ticketFilter, ticketContent} = filteredTickets[i];
            // add ticket to UI code
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = `<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete">
            <i class="fas fa-trash-alt" id=${ticketId}></i>
            </div>
            </div>
            <div class="ticket-content">${ticketContent}</div>`;
            
            ticketDiv.querySelector(".ticket-filter").addEventListener("click", toggleTicketFilter);
            ticketDiv.querySelector(".ticket-delete").addEventListener("click", handleTicketDelete);
            // append ticket to the UI/ ticket container
            ticketContainer.append(ticketDiv);
        }
    }
}