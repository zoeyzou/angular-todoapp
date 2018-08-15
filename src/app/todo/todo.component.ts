import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { TodoItem } from './shared/todo-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  todoItems: TodoItem[];
  subscription: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoItems = this.todoService.getTodos();
    this.subscription = this.todoService.todoChanged.subscribe(
      (todoList: TodoItem[]) => {
        this.todoItems = todoList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAllCompleted(allCompleted: boolean) {
    this.todoService.completeAll(allCompleted);
  }

}
