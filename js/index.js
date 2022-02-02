// const validateName = document.querySelector("#TaskName");
// validateName.classList.remove("is-valid");
// validateName.classList.remove("is-invalid");

function validFormFieldInput(data) {
  const newTaskName = document.querySelector("#TaskName");

  const newTaskNameValue = newTaskName.value.trim();

  console.log("new task name:" + newTaskNameValue);

  let test = data;
}

function displayTodayDate() {
  const dateElement = document.querySelector("#DateElement");

  const today = new Date();
  console.log("today date object", today);

  const dateFormat = { year: "numeric", month: "long", day: "numeric" };

  // const Dayparts = {
  //   year: today.getFullYear(),
  //   month: today.getMonth() + 1,
  //   day: today.getDate(),
  // };

  // dateElement.innerHTML =
  //   Dayparts.day + "/" + Dayparts.month + "/" + Dayparts.year + "";

  dateElement.innerHTML = today.toLocaleDateString("en-AU", dateFormat);
}



// display today date
displayTodayDate();

//create task manager
let taskMgr = new taskManager();

taskMgr.load();
taskMgr.render();

const form = document.querySelector("#new-task-form");

//add handler to submit event
form.addEventListener("submit", (event) => {
  //prevent default action of the form

  event.preventDefault();
  event.stopPropagation();

  const validateName = document.querySelector("#TaskName");
  const validateDescription = document.querySelector("#TaskDescription");
  const validateAssignedTo = document.querySelector("#Assigned");
  const validateDueDate = document.querySelector("#datepicker");
  const validateStatus = document.querySelector("#Status");

  let validationFail = 0;

  //log user input
  console.log("Task Name:" + validateName.value);
  console.log("Task Description :" + validateDescription.value);
  console.log("Task Assigned To :" + validateAssignedTo.value);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);

  // console.log("Task Name:" + validateName);
  // console.log("Task Description :" + validateDescription);
  // console.log("Task Assigned To :" + validateAssignedTo.value);
  // console.log("Task Due Date :" + validateDueDate);
  // console.log("Task Status:" + validateStatus);


  // let selectDate = new Date(validateDueDate.value);
  // console.log()

  // they can not select date no later than today



  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  //   // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }

  //   // Form validation for Due Date Field not empty
  if (validateDueDate.value) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");

    validationFail++;
  }

  //   // Form validation for Task Status Field not empty
  if (validateStatus.value) {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");

    validationFail++;
  }
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } // task details validated so can add to news task details to  do list
  else {
    //all the fields passed validation, so can add task
    taskMgr.addTask(
      validateName.value,
      validateDescription.value,
      validateStatus.value,
      validateAssignedTo.value,
      validateDueDate.value
    );

    // taskMgr.save();
    taskMgr.render();

    //clear form ready for next new task
    validateName.value = "";

    validateDescription.value = "";

    validateAssignedTo.value = "";

    validateDueDate.value = "";

    validateStatus.value = "";

    validateName.classList.remove("is-valid");

    validateAssignedTo.classList.remove("is-valid");

    validateDueDate.classList.remove("is-valid");

    validateStatus.classList.remove("is-valid");

    validateDescription.classList.remove("is-valid");
  }
});

const taskList = document.querySelector("#task-list");

console.log("task-list start");

  taskList.addEventListener("click", (event) => {

    console.log("button event target object", event.target);
   

     if  (event.target.classList.contains("done-button")) {

       console.log("done button clicked");

       const parentElement = event.target.parentElement.parentElement;

       console.log("parent element ", parentElement);

       //get the task id from the parentElement element
       const taskId = Number(parentElement.dataset.taskId);
       console.log("select task id ", taskId);

       //find the task in the task array
       const returnedTask = taskMgr.getTaskById(taskId);

       console.log("returned task ", returnedTask);
     }

     if (event.target.classList.contains("delete-button"))
     {
       console.log("delete button clicked");

       const parentTask = event.target.parentElement.parentElement;
       const taskId = parentTask.dataset.taskId;
       console.log("task id to delete ", taskId);

       taskMgr.deleteTask(taskId);

     }




  }
);

console.log("task-list end");



