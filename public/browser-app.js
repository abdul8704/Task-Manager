const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const taskEvents = document.querySelectorAll('.mew task')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
        data: { tasks },
    } = await axios.get("/api/tasks");
    
    
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    let ind = 0;
    const allTasks = tasks
      .map((task) => {
        const { isCompleted, _id: taskID, taskName } = task
        return `<div index="${ind++}" class="tasks single-task ${
            isCompleted && "task-completed"
        }" data-id="${taskID}" >
            <h5><span><i class="far fa-check-circle"></i></span>${taskName}</h5>
            <div class="task-links">



            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`;
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
    const el = e.target;

    // Handle DELETE button
    if (el.parentElement.classList.contains("delete-btn")) {
        loadingDOM.style.visibility = "visible";
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`/api/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
        loadingDOM.style.visibility = "hidden";
        return;
    }

    // Handle task body click (not edit or delete)
    const taskElement = el.closest(".single-task");
    if (
        taskElement &&
        !el.closest(".delete-btn") &&
        !el.closest(".edit-link")
    ) {
        const taskId = taskElement.getAttribute("data-id");
        try{
          await axios.patch(`/api/tasks/${taskId}`);
          showTasks();
        }
        catch(err){
          console.log(err);
          
        }
    }
});


// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post("/api/tasks/", { taskName: name });  
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
