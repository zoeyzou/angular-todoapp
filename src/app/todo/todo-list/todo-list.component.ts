import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList;
  private subscription: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodos();
    this.subscription = this.todoService.todoChanged.subscribe(
      (todoList) => {
        this.todoList = todoList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onEnter(todo: string) {
    console.log(todo);
  }
}
