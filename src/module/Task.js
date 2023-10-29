class Task {
  tasks = [];

  getTasks() {
    let tasksInLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    if (tasksInLocalStorage !== null) this.tasks = tasksInLocalStorage;
  }

  create(title, note) {
    const date = new Date();
    const newTask = {
      id: date.getTime(),
      title,
      note,
      createdAt: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
    };

    return newTask;
  }

  save(newTask = "") {
    if (newTask != "") this.tasks.push(newTask);

    let tasksForSave = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksForSave);
  }

  delete() {
    const deleteTaskButton = document.querySelectorAll(".delete-task");
    deleteTaskButton.forEach((button) => {
      button.addEventListener("click", (currentTask) => {
        const taskId = currentTask.target.getAttribute("data-id");

        this.tasks.filter((task, taskIndex) => {
          if (task.id != taskId) return;

          this.tasks.splice(taskIndex, 1);
          this.save();
          this.updateTasksOnScreen();
        });
      });
    });
  }

  updateTask() {
    const editTask = (currentTask) => {
      let previousTitle = "";
      let previousNote = "";

      let currentTaskId = currentTask.target.getAttribute("data-id");

      this.tasks.filter((task) => {
        if (task.id != currentTaskId) return;

        previousTitle = task.title;
        previousNote = task.note;
      });

      const newTitle = prompt("Digite um novo título:", previousTitle);
      const newNote = prompt("Digite uma nova anotação:", previousNote);

      this.tasks.map((task) => {
        if (task.id != currentTaskId) return;

        task.title = newTitle;
        task.note = newNote;
      });

      this.save();
      this.updateTasksOnScreen();
    };

    const taskEditButton = document.querySelectorAll(".task-edit");
    taskEditButton.forEach((editTaskButton) => {
      editTaskButton.addEventListener("click", editTask);
    });
  }

  updateTasksOnScreen() {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";

    this.tasks.map((task) => {
      const date = `${task?.createdAt?.day}/${task?.createdAt?.month}/${task?.createdAt?.year}`;
      const hours = `${task?.createdAt?.hour}:${task?.createdAt?.minute}`;

      const nodeFormatedArr = task.note.split("");
      nodeFormatedArr.map((char, index) => {
        if (char == "\n") nodeFormatedArr[index] = "<br>";
      });
      const nodeFormated = nodeFormatedArr.reduce((accChar, currentChar) => {
        accChar += currentChar;

        return accChar;
      }, "");

      console.log(nodeFormated);

      tasksContainer.innerHTML += `
        <div class="task">
          <h3>${task?.title}</h3><hr>
          <p class="task-note-container">
            ${nodeFormated}
          </p>
          <span class="task-date"> ${date} - ${hours} </span>
          <div class="task-options">
            <img class="task-options-svg task-edit" data-id="${task?.id}" src="./assets/pen.svg" alt="" srcset="" />
            <img class="task-options-svg delete-task" data-id="${task?.id}" src="./assets/trash.svg" alt="" srcset="" />
          </div>
        </div>
      `;
    });

    this.delete();
    this.updateTask();
  }
}

export { Task };
