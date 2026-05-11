const button = document.querySelector('#add-btn');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const appendElemenets = (span, delBtn, chkBtn, li) => {
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chkBtn);
  list.appendChild(li);
};

const addToDo = () => {
  const text = input.value.trim();

  if (text === '') return;

  const todo = {
    id: crypto.randomUUID(),
    text: text,
    check: false,
  };
  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  createTodo(todo);

  input.value = '';
};

const checkToDo = (todo, span, chkBtn) => {
  todo.check = !todo.check;
  chkBtn.textContent = todo.check ? 'uncheck' : 'check';
  span.classList.toggle('completed');

  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeToDo = (todo, li) => {
  li.remove();

  todos = todos.filter((el) => el.id !== todo.id);

  localStorage.setItem('todos', JSON.stringify(todos));
};

const createTodo = (todo) => {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = todo.text;
  if (todo.check) span.classList.add('completed');

  const delBtn = document.createElement('button');
  delBtn.textContent = 'delete';

  const chkBtn = document.createElement('button');
  chkBtn.textContent = todo.check === true ? 'uncheck' : 'check';

  delBtn.addEventListener('click', () => removeToDo(todo, li));

  chkBtn.addEventListener('click', () => checkToDo(todo, span, chkBtn));

  appendElemenets(span, delBtn, chkBtn, li);
};

todos.forEach((todo) => createTodo(todo));

button.addEventListener('click', addToDo);

input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') addToDo();
});
