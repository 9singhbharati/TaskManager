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
<!--                <td><button class="addSubTask">Add Sub Task</button></td>-->
<!--                <td><button class="editTask">Edit</button></td>-->
<!--                <td><button class="deleteTask">Delete</button></td>-->
        </tr>`;

    //if array is empty
    if(tasks == ''){
        document.getElementById('error').innerHTML = `<span>Not Found</span>`
    }else{
        document.getElementById('error').innerHTML = "";

        for(let i = 0; i < tasks.length; i++){
            taskBody.innerHTML += `
                <td>${tasks[i].taskID}</td>
                <td>${tasks[i].taskName}</td>
                <td>${tasks[i].startDate}</td>
                <td>${tasks[i].endDate}</td>
                <td>${tasks[i].status}</td>
                <td><button class="addSubTask">Add Sub Task</button></td>
                <td><button class="editTask">Edit</button></td>
                <td><button class="deleteTask">Delete</button></td>`
        }
    }
}

showTable(tasks);


// search function

var filteredData = [];

document.getElementById('searchTask').addEventListener("keyup", function (){

    var search = this.value.toLocaleLowerCase();

    filteredData = tasks.filter(function (val){
        if(val.id.toString().includes(search) || val.name.includes(search) || val.startDate.toString().includes(search) || val.endDate.toString().includes(search) || val.status.includes(search)){
            let newObj = {id : val.id, name:val.name, startDate:val.startDate, endDate: val.endDate, status: val.status};
            return newObj;
        }
    })

    showTable(filteredData);
});



// event listner on add task button (Add task functionality)
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
        startDate:startDate,
        endDate:endDate,
        status:status,
        // subtask:{
        //     id:taskID+Math.random(),
        // }
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
        <td><button class="deleteTask">Delete</button></td>
    `;
    return row;
}


// Delete functionality
// const deleteTask = document.getElementsByClassName('deleteTask');
// taskBody.addEventListener('click', (event) => {
//     if (event.target && event.target.tagName === "BUTTON" && event.target.innerText === "deleteTask") {
//         const rowToDelete = event.target.closest("tr");
//         if (rowToDelete) {
//             rowToDelete.remove();
//         }
//     }
//
//     console.log(tasks);
// });


taskTable.addEventListener("click", (event) => {
    const rowToDelete = event.target.closest("tr");
        if (rowToDelete) {
            rowToDelete.remove();

        }



    console.log("delete button clicked")
    console.log(tasks)

    tasks.map(function (task) {
        delete task.id;
        return tasks;
    });

});



