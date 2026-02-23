const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement("input");
    taskText.type = "text";
    taskText.value = task.text;
    taskText.disabled = true;

    taskText.addEventListener("dblclick", () => {
      taskText.disabled = false;
      taskText.focus();
    });

    taskText.addEventListener("blur", () => {
      if (taskText.value.trim() === "") {
        alert("Task cannot be empty.");
        taskText.value = task.text;
      } else {
        task.text = taskText.value.trim();
        saveTasks();
      }
      taskText.disabled = true;
      renderTasks();
    });

    taskInfo.appendChild(checkbox);
    taskInfo.appendChild(taskText);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✎";
    editBtn.title = "Edit task";
    editBtn.addEventListener("click", () => {
      taskText.disabled = false;
      taskText.focus();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.title = "Delete task";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(buttonsDiv);
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }

    taskList.appendChild(li);
  });
}
