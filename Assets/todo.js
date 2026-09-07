let tasks = [];

// Runs when the page loads, so we can react to button clicks etc.
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const status = document.getElementById("status");

// Listen for the form being submitted (clicking Add or hitting Enter)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  const taskText = input.value;

  // don't add empty tasks
  if (taskText === "") {
    return;
  }

  // add a new task object
  tasks.push({
    text: taskText,
    completed: false
  });

  input.value = ""; // clear the box
  showTasks(); // redraw the list on the page
});

// This function shows the whole task list on the page
function showTasks() {
  // start with an empty string, then build up HTML as we go
  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // if the task is completed, add a class that puts a line through it
    let lineThrough = "";
    if (task.completed) {
      lineThrough = "text-decoration: line-through; color: gray;";
    }

    html += "<li>";
    html += "<input type='checkbox' onclick='toggleComplete(" + i + ")'";
    if (task.completed) {
      html += " checked";
    }
    html += ">";
    html += "<span style='" + lineThrough + "'>" + task.text + "</span>";
    html += "<button onclick='deleteTask(" + i + ")'>Delete</button>";
    html += "</li>";
  }

  list.innerHTML = html;

  // update the little status line at the top
  let doneCount = 0;
  for (let j = 0; j < tasks.length; j++) {
    if (tasks[j].completed) {
      doneCount = doneCount + 1;
    }
  }

  if (tasks.length === 0) {
    status.textContent = "Hurry up and get to it.";
  } else {
    status.textContent = (tasks.length - doneCount) + " open, " + doneCount + " done";
  }
}

// Flips a task between done / not done
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  showTasks();
}

// Removes a single task from the array
function deleteTask(index) {
  const sure = confirm("Delete this task?");

  if (sure) {
    tasks.splice(index, 1); // removes 1 item at position "index"
    showTasks();
  }
}

// Removes ALL completed tasks, but checks with the user first
function clearCompleted() {
  const sure = confirm("Delete all completed tasks?");

  if (sure) {
    const stillTodo = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === false) {
        stillTodo.push(tasks[i]);
      }
    }

    tasks = stillTodo;
    showTasks();
  }
}

// Draw the list once when the page first loads
showTasks();