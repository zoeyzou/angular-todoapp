import { Injectable } from '@angular/core';
import { Subject } from '../../../../node_modules/rxjs';
import { TodoItem } from './todo-item.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoChanged = new Subject();
  todoFiltered = new Subject();
  itemOnEdit: TodoItem;

  todoList: TodoItem[] = [
    new TodoItem('Eat an apple', true),
    new TodoItem('Count stars', true),
    new TodoItem('Clean dishes', false),
    new TodoItem('Watch Doctor Who', true),
    new TodoItem('Sleep early', false)
  ];

  constructor() { }

  addTodo(todo: TodoItem) {
    this.todoList.push(todo);
    this.todoChanged.next(this.todoList.slice());
  }

  getTodos() {
    return this.todoList.slice();
  }

  deleteTodo(id: number) {
    this.todoList.splice(id, 1);
    this.todoChanged.next(this.todoList.slice());
    console.log(this.todoList);
  }

  changeTodo(id: number, todo: TodoItem) {
    this.todoList[id] = todo;
    this.todoChanged.next(this.todoList.slice());
    console.log(this.todoList);
  }

  filterTodo(condition: string): TodoItem[] {
    console.log(condition);

    let filteredTodo;

    if (condition === 'completed') {
      filteredTodo = this.todoList.filter(todo => todo.isCompleted);
    } else if (condition === 'active') {
      filteredTodo = this.todoList.filter(todo => !todo.isCompleted);
    } else {
      filteredTodo = this.todoList;
    }

    console.log(filteredTodo);

    this.todoFiltered.next(filteredTodo);
    return filteredTodo;
  }

  clearCompleted() {
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);
    this.todoChanged.next(this.todoList.slice());
  }

  completeAll(isAllCompleted: boolean) {
    this.todoList.forEach(todo => todo.isCompleted = isAllCompleted);
    this.todoChanged.next(this.todoList.slice());
  }
}
