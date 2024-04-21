// const example = process.env.EXAMPLE

const addBtn = document.getElementById('add-btn')
const todoList = document.querySelector('.todo-list')

const todos = JSON.parse(localStorage.getItem('todos')) || []

const saveTodosToLocalStorange = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const localTodosFromLocalStorange = () => {
    todos.forEach((todo) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span>${todo}</span>
            <button class="del-todo">Del</button>
        `
        todoList.appendChild(todoItem)
    }
)}

localTodosFromLocalStorange()

const handleAddBtn = () => {
    const inputTodo = document.getElementById('input-todo');
    const inputTodoValue = inputTodo.value.trim()

    if (inputTodoValue === '') {
        alert('Please, enter a text!')
    } else {
        todos.push(inputTodoValue)
        saveTodosToLocalStorange()
    
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span>${inputTodoValue}</span>
            <button class="del-todo">Del</button>
        `
        todoList.appendChild(todoItem)
        inputTodo.value = ''
        inputTodo.focus()
    }
}

addBtn.addEventListener('click', handleAddBtn);