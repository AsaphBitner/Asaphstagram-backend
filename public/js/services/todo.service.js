import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TODO_KEY = 'todos'
const TODO_URL = '/api/todo/'

_createTodos();

export const todoService = {
    query,
    remove,
    save,
    getEmptyTodo,
    getById,
}

function query() {
    return storageService.query(TODO_KEY)
}

function getById(id) {
    return storageService.get(TODO_KEY, id)
}
function remove(todoId) {
    return storageService.remove(TODO_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        return storageService.post(TODO_KEY, todo)
    }
}



function _createTodos() {
    let todos = utilService.loadFromStorage(TODO_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo('Learn CSS'));
        todos.push(_createTodo('Study HTML'));
        todos.push(_createTodo('Master JS'));
        utilService.saveToStorage(TODO_KEY, todos)
    }
    return todos;
}

function getEmptyTodo() {
    return { _id: '', txt: '', completed: false }
}


function _createTodo(txt) {
    const todo = getEmptyTodo();
    todo._id = utilService.makeId();
    todo.txt = txt;
    return todo;
}



