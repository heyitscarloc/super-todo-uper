
function toggleCheckboxText() {
  let completedDate;
  // update UI
  if(event.target.checked){
    event.target.parentElement.style.textDecoration= "line-through";
    completedDate = Date.now();
  }else{
    event.target.parentElement.style.textDecoration= "none";
    completedDate = null;
  }

  //update task
  s_updateTask(event.target.id, completedDate);

  refreshTasks();
}

function deleteTask() {
  let itemDiv = event.target.closest(".item");
  let checkboxHtml = itemDiv.querySelector("input");
  s_deleteTask(checkboxHtml.id);
  refreshTasks();
}

function loadAll() {

  loadPlaceholderText();
  refreshTasks();

  self.setInterval(refreshTasks, 5000);
}

function loadPlaceholderText() {
  // array of potential placeholders
  var randomPlaceholderText = ["Take a walk", "Fill cat's food bowl", "Go to doctors appointment", "Do the laundry", "Replace fish tank water", "Accept RSVP for event", "Replace tires", "Rake the leaves", "Buy milk", "Get high" ];

  //selected placeholder text using math api
  var pickedPlaceholderText = randomPlaceholderText[Math.floor(Math.random() * 10)];

  //get add task text
  var selectedControl = document.getElementById("addTaskText");

  //set random text to attribute
  selectedControl.attributes.placeholder.value = pickedPlaceholderText;

}

function saveTask() {
  let taskText = document.getElementById("addTaskText").value;
  
  // do work only if we need to
  if(!taskText) {
    return;
  }

  let savedTask = s_saveTask(taskText, Date.now(), null);
  document.getElementById("addTaskText").value = "";

  refreshTasks();


}

function refreshTasks() {
  // clear all items
  document.querySelectorAll(".item").forEach(item => item.remove());

  let tasks = s_getAllTasks();
  
  // refresh task list
  for(let i=0; i < tasks.length; i++) {
    document.getElementById("list").innerHTML += objectToDivItem(tasks[i].task, tasks[i].createdDate, tasks[i].completedDate);
  }
}

function clearAll() {
  s_clearAll();
  // clear all items
  document.querySelectorAll(".item").forEach(item => item.remove());
  document.getElementById("list").innerHTML += emptyItem();
}

// html to update
function objectToDivItem(task, createdDate, completedDate) {
  return `<div class='item' style=${completedDate !== null ? 'text-decoration:line-through' : ''}><label><input id='${createdDate}' class='pad' type='checkbox' onclick='toggleCheckboxText()' ${completedDate !== null ? 'checked' : ''} >${task}</label><button onclick='deleteTask()'>delete</button></div>`;
}

function emptyItem() {
  return `<div class="item"><p>There's nothing todo!</p></div>`;
}