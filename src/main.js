import { Task } from "./module/Task.js";

const titleInput = document.getElementById("task-title");
const noteInput = document.getElementById("task-note");
const saveTaskButton = document.getElementById("task-save");

const task = new Task();
task.getTasks();
task.updateTasksOnScreen();

function getTaskData() {
  const title = titleInput.value;
  const note = noteInput.value;

  titleInput.value = "";
  noteInput.value = "";

  if (title == "") {
    alert("Sorry!!\n\nPara criar uma tarefa é necessário um titúlo.");
  } else {
    const newTask = task.create(title, note);
    task.save(newTask);
    task.updateTasksOnScreen();
  }
}

saveTaskButton.addEventListener("click", () => getTaskData());

let previousKey = "";
window.addEventListener("keydown", (e) => {
  if (previousKey == "Control" && e.key == "Enter") getTaskData();

  previousKey = e.key;
});
