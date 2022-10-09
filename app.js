//selected
const addToday = document.querySelector(".addtoday");
const addTomorrow = document.querySelector(".addtomorrow");
const templateToday = document.querySelector(".templatetoday");
const templateTomorrow = document.querySelector(".templatetomorrow");
const todayList = document.querySelector(".todaylist");
const tomorrowList = document.querySelector(".tomorrowlist");
const myList = document.querySelector(".mylist");
const countTodo = document.querySelector(".count");

//variables
let idNumber = 0;
let todayArray = [];
let tomorrowArray = [];
let inputDataArray = [];
const today = "today";
const tomorrow = "tomorrow";

let checkAddClick = 0;
let clickCount = 0;

//functions

addToday.addEventListener("click", () => {
  createInput(templateToday);
  checkAddClick++;
});
addTomorrow.addEventListener("click", () => {
  createInput(templateTomorrow);
  checkAddClick++;
});

function createInput(where) {
  where.innerHTML = `
  <div class='todo list' id='draft'>
  <i class="fa-regular fa-circle fa-2x"></i>
  <input type='text' id="writing" name="writing">
  <i class="fa-regular fa-circle fa-2x hardhide"></i>
  </div>
`;

  let textField = document.getElementById("writing");
  textField.focus();
  inputDataArray.push(where, textField);
}

document.addEventListener("click", () => {
  clickCount++;

  let where = inputDataArray[0];
  let textField = inputDataArray[1];

  if ((clickCount == 2 && checkAddClick == 1) || checkAddClick == 2) {
    saveTodo(where, textField);
    textField.value = "";
    removeInput();
    inputDataArray = [];

    clickCount = 0;
    checkAddClick = 0;
  } else if (clickCount > 2) {
    clickCount = 0;
    checkAddClick = 0;
    inputDataArray = [];
  } else if (clickCount == 1 && checkAddClick == 0) {
    clickCount = 0;
    inputDataArray = [];
  }
});

function saveTodo(arrayChoose, text) {
  let todayDraft = text.value;
  idNumber += 1;
  let todo = {
    id: idNumber,
    description: todayDraft,
    isCompleted: false,
  };
  if (arrayChoose === templateToday) {
    todayArray.push(todo);
    ShowTodo(today);
  } else {
    tomorrowArray.push(todo);
    ShowTodo(tomorrow);
  }
}

function removeInput() {
  let deletedElement = document.getElementById("draft");
  deletedElement.remove();
}

function ShowTodo(showArray) {
  if (showArray === "today") {
    renderToDo(todayList, todayArray, showArray);
    console.log(todayArray);
  } else {
    renderToDo(tomorrowList, tomorrowArray, showArray);
    console.log(tomorrowArray);
  }
}

function renderToDo(list, array, show) {
  list.innerHTML = "";
  array.forEach((todo, index) => {
    list.innerHTML += `
<div class="todo ${show} ${todo.isCompleted ? "completed" : ""}"  id=${index}>
<i class="${
      todo.isCompleted
        ? "fa-solid fa-circle-check fa-2x"
        : "fa-regular fa-circle fa-2x"
    }" data-action="check"></i> 
<p class="texttodo ${todo.isCompleted ? "textcompleted" : ""}">${
      todo.description
    }</p>
<i class="fa-solid fa-circle-xmark fa-2x hide" data-action="delete"></i>
</div>
`;
  });
  toDosCount();
}

myList.addEventListener("click", (e) => {
  const target = e.target;
  const parentElement = target.parentNode;
  const todo = parentElement;
  const todoId = Number(todo.id);
  const action = target.dataset.action;

  if (action === "check" && parentElement.classList.contains("today")) {
    checkEvent(todoId, today);
  } else if (
    action === "check" &&
    parentElement.classList.contains("tomorrow")
  ) {
    checkEvent(todoId, tomorrow);
  }
  if (action === "delete" && parentElement.classList.contains("today")) {
    deleteEvent(todoId, today);
  } else if (
    action === "delete" &&
    parentElement.classList.contains("tomorrow")
  ) {
    deleteEvent(todoId, tomorrow);
  }
});

function checkEvent(todoId, day) {
  if (day === "today") {
    todayArray = checkCreator(todoId, todayArray);
    ShowTodo(today);
  } else if (day === "tomorrow") {
    tomorrowArray = checkCreator(todoId, tomorrowArray);
    ShowTodo(tomorrow);
  }
}

function checkCreator(todoId, array) {
  let newArray = array.map((todo, index) => {
    if (index === todoId) {
      return {
        id: todo.id,
        description: todo.description,
        isCompleted: !todo.isCompleted,
      };
    } else {
      return {
        id: todo.id,
        description: todo.description,
        isCompleted: todo.isCompleted,
      };
    }
  });
  array = newArray;
  return array;
}

function deleteEvent(todoId, day) {
  if (day === "today") {
    todayArray = todayArray.filter((todo, index) => index !== todoId);
    ShowTodo(today);
  } else {
    tomorrowArray = tomorrowArray.filter((todo, index) => index !== todoId);
    ShowTodo(tomorrow);
  }
  toDosCount();
}

function toDosCount() {
  countTodo.textContent = todayArray.length + tomorrowArray.length;
}
