// Store each task as an object with a name and a status.
const todos = [];

// Get the HTML elements we need.
const input = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const list = document.querySelector("#todo-list");
const info = document.querySelector("#info");
const completedLabel = document.querySelector("#completed-label");

// Connect the button to a named function, as in lesson 13.
addButton.addEventListener("click", addTodo);

// Add a new task to both the array and the HTML list.
function addTodo() {
  const text = input.value.trim();

  // Stop if the input is empty or contains only spaces.
  if (text.length === 0) {
    info.textContent = "Please write a task before adding it.";
    input.focus();
    return;
  }

  // Add an object to the array. False means unfinished.
  const todo = { name: text, status: false };
  todos.push(todo);

  // Create the list item and its text.
  const item = document.createElement("li");
  const itemLabel = document.createElement("span");
  itemLabel.classList.add("todo-text");
  itemLabel.textContent = todo.name;
  item.appendChild(itemLabel);

  // Create a trash button for this task.
  const trashcan = document.createElement("button");
  trashcan.type = "button";
  trashcan.textContent = "\u{1F5D1}";
  trashcan.classList.add("trash-button");
  trashcan.setAttribute("aria-label", "Delete task: " + todo.name);
  item.appendChild(trashcan);
  list.appendChild(item);

  // Connect each row and its trash button to named functions.
  item.addEventListener("click", changeStatus);
  trashcan.addEventListener("click", deleteTodo);

  // VG: change a task from unfinished to completed, or back again.
  function changeStatus() {
    if (todo.status === false) {
      todo.status = true;
      item.classList.add("completed");
    } else {
      todo.status = false;
      item.classList.remove("completed");
    }

    updateCompletedCount();
  }

  // VG: remove the same task from the array and the HTML list.
  function deleteTodo(event) {
    // Stop the trash click from also activating the row's click listener.
    event.stopPropagation();

    // Find this exact object, even if two tasks have the same name.
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    item.remove();
    updateCompletedCount();
  }

  // Clear the input and message, then update the counter.
  input.value = "";
  info.textContent = "";
  input.focus();
  updateCompletedCount();
}

// Count completed objects in the array and update the label.
function updateCompletedCount() {
  let completedCount = 0;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === true) {
      completedCount++;
    }
  }

  completedLabel.textContent = `${completedCount} completed of ${todos.length} tasks`;
}
