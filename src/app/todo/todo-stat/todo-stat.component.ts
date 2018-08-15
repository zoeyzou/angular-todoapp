import { Component, OnInit, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { TodoItem } from '../shared/todo-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-stat',
  templateUrl: './todo-stat.component.html',
  styleUrls: ['./todo-stat.component.css']
})
export class TodoStatComponent implements OnInit, DoCheck, OnDestroy {

  someCompleted: boolean;
  todoItems: TodoItem[];
  subscription: Subscription;

  filteredView = 'all';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoItems = this.todoService.getTodos();
    this.someCompleted = this.todoItems.some(item => item.isCompleted);
    this.subscription = this.todoService.todoChanged.subscribe(
      (todoList: TodoItem[]) => {
        this.todoItems = todoList;
      }
    );
  }

  ngDoCheck() {
    console.log('something changed');
    this.someCompleted = this.todoItems.some(item => item.isCompleted);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
