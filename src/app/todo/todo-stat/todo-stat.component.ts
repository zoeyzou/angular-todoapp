import { Component, OnInit, DoCheck } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { TodoItem } from '../shared/todo-item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-stat',
  templateUrl: './todo-stat.component.html',
  styleUrls: ['./todo-stat.component.css']
})
export class TodoStatComponent implements OnInit, DoCheck {

  someCompleted: boolean;
  totalTodos: TodoItem[];
  todoItems: TodoItem[];
  private ngUnsubscribe = new Subject<boolean>();

  filteredView = 'all';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.totalTodos = this.todoService.getTodos();
    this.todoItems = this.todoService.filterTodo(this.filteredView);
    this.someCompleted = this.todoItems.some(item => item.isCompleted);
    this.todoService.todoFiltered
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (todoList: TodoItem[]) => {
          this.todoItems = todoList;
        }
      );
    this.todoService.todoChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (todoList: TodoItem[]) => {
          this.totalTodos = todoList;
        }
      );
  }

  ngDoCheck() {
    console.log('something changed');
    this.someCompleted = this.todoItems.some(item => item.isCompleted);
  }

  onFilter(condition: string) {
    this.filteredView = condition;
    console.log(condition);
    this.todoService.filterTodo(condition);
  }

  onClearCompleted() {
    this.todoService.clearCompleted();
  }
}
