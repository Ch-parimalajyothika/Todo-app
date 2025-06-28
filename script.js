const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('toggle-theme');

// Load theme on page load
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeIcon();
  loadTasks();
};

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem("theme", document.body.classList.contains('dark') ? "dark" : "light");
  updateThemeIcon();
});

function updateThemeIcon() {
  const btn = document.getElementById("toggle-theme");
  if (document.body.classList.contains("dark")) {
    btn.innerHTML = "☀️";
  } else {
    btn.innerHTML = `
      <svg id="moonIcon" xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" fill="#FFD700">
        <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"/>
      </svg>
    `;
  }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const tasks = getStoredTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskInput.value = '';
}

function loadTasks() {
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  const tasks = getStoredTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}/>
      <span>${task.text}</span>
      <button class="delete-btn">🗑️</button>
    `;

    const checkbox = li.querySelector('input');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

function getStoredTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}


