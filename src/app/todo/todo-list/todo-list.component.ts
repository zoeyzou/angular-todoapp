import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList;
  private ngUnsubscribe = new Subject<boolean>();
  private subscription: Subscription;


  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodos();
    this.todoService.todoFiltered
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (todoList) => {
          this.todoList = todoList;
        }
      );
    this.todoService.todoChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (todoList) => {
          this.todoList = todoList;
        }
      );
  }

  ngOnDestroy() {
  }


  onEnter(todo: string) {
    console.log(todo);
  }
}
