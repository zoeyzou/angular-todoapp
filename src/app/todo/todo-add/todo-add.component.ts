import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { TodoItem } from '../shared/todo-item.model';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit, OnDestroy {
  todoItem: TodoItem;
  subscription: Subscription;
  isAllCompleted = false;
  @Output() complete = new EventEmitter<boolean>();
  @ViewChild('form') todoForm: NgForm;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.subscription = this.subscription = this.todoService.todoChanged.subscribe(
      (todoList: TodoItem[]) => {
        this.isAllCompleted = todoList.every(todo => todo.isCompleted);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.value.item !== '') {
      this.todoItem = new TodoItem(form.value.item);
      this.todoService.addTodo(this.todoItem);
    }
    this.todoForm.reset();
  }

  onCompleteAll() {
    this.isAllCompleted = !this.isAllCompleted;
    this.complete.emit(this.isAllCompleted);
  }
}
