const taskIDInput = document.getElementById('taskID');
const taskNameInput = document.getElementById('taskName');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const statusSelect = document.getElementById('status');
const parentTaskForm = document.getElementById("parentTaskForm");
const addTaskBtn = document.getElementById('addTaskBtn');
// const taskList = document.getElementById('taskList');
const taskTable = document.getElementById("taskTable");
const taskBody = document.getElementById('tableBody');

let tasks = [];


// eventlistner on add task button (Add task functionality)
addTaskBtn.addEventListener('click', () => {

    const taskID = parseInt(taskIDInput.value);
    const taskName = taskNameInput.value;
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const status = statusSelect.value;

    if (isNaN(taskID)) {
        alert('Please fill Task ID');
        return;
    }else  if (isTaskIDTaken(taskID)) {
        alert('Task ID is already taken.');
        return;
    }
    else if(taskName.trim() === ''){
        alert('Please fill Task Name');
        return;
    }else if( startDate.toString() === 'Invalid Date' ){
        alert('Please fill Start Date');
        return;
    }else if( endDate.toString() === 'Invalid Date' ){
        alert('Please fill End Date');
        return;
    }
    else if (endDate < startDate) {
        alert('End Date should be after the Start Date');
        return;
    }

    if (isTaskIDTaken(taskID)) {
        alert('Task ID is already taken.');
        return;
    }

    const task = {
        id: taskID,
        name: taskName,
        startDate,
        endDate,
        status
    };

    tasks.push(task);
    updateTaskList();
    alert('Task added successfully!');
    console.log(tasks);

    // Clear the form
    parentTaskForm.reset();

});

// to check if task id is already taken
function isTaskIDTaken(taskID) {
    return tasks.some(task => task.id === taskID);
}


// Update tasklist in html
function updateTaskList() {
    const taskID = taskIDInput.value;
    const taskName= taskNameInput.value;
    const startDate= startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusSelect.value;

    const newRow = createTableRow(taskID,taskName, startDate, endDate, status);
    taskTable.appendChild(newRow);
}

// create table in html
function createTableRow(taskID, taskName, startDate, endDate, status) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${taskID}</td>
        <td>${taskName}</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>${status}</td>
        <td><button class="addSubTask">Add Sub Task</button></td>
        <td><button class="editTask">Edit</button></td>
        <td><button class="deleteTask">Delete</button></td>
    `;
    return row;
}


// Delete functionality
// const deleteTask = document.getElementsByClassName('deleteTask');
// deleteTask.addEventListener('click', () => {
//     if (deleteTask.target && deleteTask.target.tagName === "BUTTON" && deleteTask.target.innerText === "deleteTask") {
//         const rowToDelete = event.target.closest("tr");
//         if (rowToDelete) {
//             rowToDelete.remove();
//         }
//     }

//     console.log(tasks);
// });


taskTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteTask")) {
      event.target.parentElement.remove();
    }
  });



