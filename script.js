// script.js
const themeToggleBtn = document.getElementById('theme-toggle');
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Toggle Theme
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '🌞';
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load Theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggleBtn.textContent = '🌙';
}

// Load Tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach((task) => addTaskToDOM(task.text, task.completed));

// Add Task
addBtn.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }
  addTaskToDOM(taskText);
  saveTask(taskText);
  todoInput.value = '';
});

// Save Task to localStorage
function saveTask(text, completed = false) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update localStorage
function updateStorage() {
  const tasks = Array.from(todoList.children).map((li) => ({
    text: li.textContent.replace('Delete', '').trim(),
    completed: li.classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add Task to DOM
function addTaskToDOM(text, completed = false) {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  if (completed) listItem.classList.add('completed');

  // Mark as Completed
  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    updateStorage();
  });

  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    listItem.remove();
    updateStorage();
  });

  listItem.appendChild(deleteBtn);
  todoList.appendChild(listItem);
}