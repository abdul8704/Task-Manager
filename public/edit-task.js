const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/tasks/${id}`)

    const { _id: taskID, isCompleted, taskName } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = taskName;
    tempName = taskName;
    if (isCompleted) {
        taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const newtaskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const response = await axios.put(`/api/tasks/${id}`, {
        taskName: newtaskName,
        isCompleted: taskCompleted,
    });
    const task = response.data.task
    const { _id: taskID, isCompleted, taskName } = task
    taskIDDOM.textContent = taskID
    taskNameDOM.value = taskName;
    tempName = taskName;
    if (isCompleted) {
        taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
