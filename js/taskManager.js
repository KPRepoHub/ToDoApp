


// task class
class Task {
  constructor(
    taskId,
    taskName,
    taskDescription,
    taskStatus,
    taskOwner,
    taskDueDate
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskStatus = taskStatus;
    this.taskOwner = taskOwner;

    const dateFormat = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = new Date(taskDueDate);
    const formattedDate = dueDate.toLocaleDateString("en-AU", dateFormat);
    this.taskDueDate = formattedDate;
  }

  
}


//task manager class


class taskManager {
  //   static currentID = 0;

  constructor(currentId = 0) {
    this.currentID = currentId;

    //initialize array to save new tasks
    this.taskList = [];

    console.log(
      "value of task array when task Manager is initialized: ",
      this.taskList
    );

    console.log("initialize task manager, tasks init state: ", this.taskList);
  }

  validFormFieldInput(
    taskName,
    taskDescription,
    taskOwner,
    dueDate,
    taskStatus
  ) {}

  //add new task
  addTask(taskName, taskDescription, taskStatus, taskOwner, taskDueDate) {
    this.currentID += 1;

    //create task object using task class
    const task = new Task(
      this.currentID,
      taskName,
      taskDescription,
      taskStatus,
      taskOwner,
      taskDueDate
    );

    this.taskList.push(task);
    console.log("new task added to taskList array: ", task);

    //save to local storage
    this.save();
    console.log("array content saved in local storage", this.taskList);
  }

  createTaskHtml(task) {
    // <ul class="list-group" id="task-list">  </ul>

    let taskStr = `
                        <li class="list-group-item" data-task-id="${
                          task.taskId
                        }">
                            <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
                                <h5>${task.taskName}</h5>
                                <span class="badge badge-progress">${
                                  task.taskStatus
                                }</span>
                            </div>
                            <div class="d-flex w-100 mb-3 justify-content-between">
                                <small>Assigned To: ${task.taskOwner}</small>
                                <small>Due: ${task.taskDueDate}</small>
                            </div>
                            <p>${task.taskDescription}</p>
                            <p>
                                <button class="done-button btn btn-secondary btn-sm ${
                                  String(task.taskStatus).toLowerCase() ===
                                  "done"
                                    ? "invisible"
                                    : "visible"
                                }" name="done" type="button">Done</button>
                                <button class="delete-button delete btn btn-secondary btn-sm visible" name="delete">DELETE</button>
                            </p>
                        </li>
                    `;

    return taskStr;
  }

  getTaskById(taskId) {
    let foundTask;

    for (const tsk of this.taskList) {
      console.log("current task ", tsk);

      if (Number(taskId) == Number(tsk.taskId)) {
        foundTask = tsk;
        console.log("task found in array ", tsk);

        //update the status
        tsk.taskStatus = "Done";

        break;
      }
    }

    //save to local storage
    this.save();
    console.log("array content saved in local storage", this.taskList);

    this.render();
    // if task found it will be returned, otherwise return undefined object
    return foundTask;
  }

  save() {
    let tasksJson = JSON.stringify(this.taskList);

    localStorage.setItem("tasks", tasksJson);

    const currentId = String(this.currentID);

    localStorage.setItem("currentId", currentId);
  }

  load() {
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      this.taskList = JSON.parse(tasksJson);
    }

    const currentId = localStorage.getItem("currentId");

    if (currentId) {
      this.currentID = Number(currentId);
    }
  }

  deleteTask(taskId) {

    console.log("deleteTask");

    let newTasks = [];
    for (const task of this.taskList) {
        if (task.taskId != Number(taskId))
        {
            console.log("push to new array for task id ", task.taskId);
            newTasks.push(task);
        }        
    }

    this.taskList = newTasks;

    this.save();
    this.render();

    
  }

  render() {
    let tasksHtmlList = [];
    let newTasks = document.getElementById("task-list");
    let taskHTML = "";

    for (let i = 0; i < this.taskList.length; i++) {
      let currentTask = this.taskList[i];

      taskHTML = this.createTaskHtml(currentTask);
      console.log(taskHTML);

      tasksHtmlList.push(taskHTML);
    }

    taskHTML = tasksHtmlList.join("\n");

    newTasks.innerHTML = taskHTML;

    console.log(taskHTML);

    const taskList = document.querySelector("#task-list");

    console.log("task-list start2");

    taskList.addEventListener("click", (event) => {
      console.log("taskList done button event target object", event.target);
    });

    console.log("task-list end2");
  }
}
