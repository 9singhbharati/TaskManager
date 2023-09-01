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

//show table data
function showTable(tasks){
    taskTable.innerHTML = `<tr>
                <td>Task ID</td>
                <td>Task Name</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Status</td>
                <th>Add Sub Task</th>
                <th>Edit</th>
                <th>Delete</th>
        </tr>`;

    // //if array is empty
    // if(tasks == ''){
    //     document.getElementById('error').innerHTML = `<span>Not Found</span>`
    // }else{
    //     document.getElementById('error').innerHTML = "";

    //     for(let i = 0; i < tasks.length; i++){
    //         taskBody.innerHTML += `
    //             <td>${tasks[i].taskID}</td>
    //             <td>${tasks[i].taskName}</td>
    //             <td>${tasks[i].startDate}</td>
    //             <td>${tasks[i].endDate}</td>
    //             <td>${tasks[i].status}</td>
    //             <td><button class="addSubTask">Add Sub Task</button></td>
    //             <td><button class="editTask" id="demo" onClick="demo(1)">Edit</button></td>
    //             <td><button class="deleteTask">Delete</button></td>`
    //     }
    // }

    console.log("show table is called");
}

showTable(tasks);


// search function

// Attach an event listener to the search input field
document.getElementById('searchTask').addEventListener("keyup", function () {
    const search = this.value.toLowerCase(); // Get the lowercase search query

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter(tasks =>
        tasks.id.toString().includes(search) ||
        tasks.taskName.toLowerCase().includes(search) ||
        tasks.startDate.toISOString().slice(0, 10).includes(search) || // Convert Date to yyyy-mm-dd format
        tasks.endDate.toISOString().slice(0, 10).includes(search) ||   // Convert Date to yyyy-mm-dd format
        tasks.status.toLowerCase().includes(search)
    );

    console.log("this is filtered task")
    console.log(filteredTasks);

    // Update the table with the filtered tasks
    showTable(filteredTasks);
});




// event listner on add task button (Add task functionality)
const addTask = addTaskBtn.addEventListener('click', () => {

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
        taskName: taskName,
        startDate:startDate,
        endDate:endDate,
        status:status,
        subtask:[]
    };

    tasks.push(task);
    updateTaskList();
    // alert('Task added successfully!');
    console.log(tasks);

    // Clear the form
    parentTaskForm.reset();

});

// to check if task id is already taken
function isTaskIDTaken(taskID) {
    return tasks.some(task => task.id === taskID);
}


// Update task list in html
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
        <td><button class="deleteTask" >Delete</button></td>
    `;
    return row;
}


// Delete functionality
taskTable.addEventListener("click", (event) => {
    const rowToDelete = event.target.closest("tr");
    //console.log(rowToDelete);

    if (!event.target.classList.contains("deleteTask")){
        return
    }else{
        const rowIndex = rowToDelete.rowIndex - 1; // Subtract 1 because JavaScript arrays are zero-indexed, and rowIndex starts at 1

        if (rowIndex >= 0 && rowIndex < tasks.length) {
            // Check if the rowIndex is within the bounds of the 'tasks' array
            tasks.splice(rowIndex, 1); // Remove the object from the 'tasks' array
        }
        rowToDelete.remove();
    }
    
    console.log("delete button clicked")
    console.log(tasks)
});


// Update functionality

// Event listener for "Edit" buttons
taskTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("editTask")) {
        const rowToEdit = event.target.closest("tr");
        const rowIndex = rowToEdit.rowIndex - 1; // Subtract 1 because JavaScript arrays are zero-indexed

        if (rowIndex >= 0 && rowIndex < tasks.length) {
            const taskToEdit = tasks[rowIndex];

            // Populate the form fields with the task values for editing
            taskIDInput.value = taskToEdit.id;
            taskNameInput.value = taskToEdit.taskName;
            startDateInput.value = taskToEdit.startDate.toISOString().slice(0, 10); // Convert Date to yyyy-mm-dd format
            endDateInput.value = taskToEdit.endDate.toISOString().slice(0, 10);     // Convert Date to yyyy-mm-dd format
            statusSelect.value = taskToEdit.status;

            // Disable the Task ID input field as you probably don't want to edit the Task ID
            taskIDInput.disabled = true;

            // Change the button text to "Update Task"
            addTaskBtn.textContent = "Update Task";

            // Add an event listener for updating the task
            addTaskBtn.removeEventListener("click", addTask); // Remove the old event listener
            addTaskBtn.addEventListener("click", () => updateTask(rowIndex)); // Add a new event listener for updating
        }
    }
});

// Function to update an existing task or add a new task
function updateTask(rowIndex) {
    const editedTaskID = parseInt(taskIDInput.value);
    const editedTaskName = taskNameInput.value;
    const editedStartDate = new Date(startDateInput.value);
    const editedEndDate = new Date(endDateInput.value);
    const editedStatus = statusSelect.value;

    if (editedTaskName.trim() === '') {
        alert('Please fill Task Name');
        return;
    } else if (editedStartDate.toString() === 'Invalid Date') {
        alert('Please fill Start Date');
        return;
    } else if (editedEndDate.toString() === 'Invalid Date') {
        alert('Please fill End Date');
        return;
    } else if (editedEndDate < editedStartDate) {
        alert('End Date should be after the Start Date');
        return;
    } else if (isTaskIDTaken(editedTaskID, rowIndex)) {
        alert('Task ID is already taken.');
        return;
    }

    // Create or update the task object with the edited values
    const editedTask = tasks[rowIndex];
    if (!editedTask) {
        // If no task exists at the specified index, create a new one
        const newTask = {
            id: editedTaskID,
            taskName: editedTaskName,
            startDate: editedStartDate,
            endDate: editedEndDate,
            status: editedStatus,
            subtask: []
        };
        tasks.push(newTask);
        updateTaskList(newTask); // Add the new task to the table
    } else {
        // Update the existing task with the edited values
        editedTask.id = editedTaskID;
        editedTask.taskName = editedTaskName;
        editedTask.startDate = editedStartDate;
        editedTask.endDate = editedEndDate;
        editedTask.status = editedStatus;
        updateRow(rowIndex, editedTask); // Update the row with the edited task
    }

    // Clear the form and re-enable the Task ID input field
    parentTaskForm.reset();
    taskIDInput.disabled = false;

    // Change the button text back to "Add Task"
    addTaskBtn.removeEventListener("click", updateTask); // Remove the updateTask listener
    addTaskBtn.addEventListener("click", addTask); // Re-add the addTask listener
    addTaskBtn.textContent = "Add Task";
}

// Function to update the HTML row based on the edited task
function updateRow(rowIndex, editedTask) {
    const rowToUpdate = taskTable.rows[rowIndex + 1]; // Add 1 to adjust for table header
    const cells = rowToUpdate.getElementsByTagName("td");

    // Update the content of each cell with the task properties
    cells[0].textContent = editedTask.id;
    cells[1].textContent = editedTask.taskName;
    cells[2].textContent = editedTask.startDate.toISOString().slice(0, 10);
    cells[3].textContent = editedTask.endDate.toISOString().slice(0, 10);
    cells[4].textContent = editedTask.status;
}


// Function to check if task ID is already taken
function isTaskIDTaken(taskID, currentIndex) {
    return tasks.some((task, index) => index !== currentIndex && task.id === taskID);
}

