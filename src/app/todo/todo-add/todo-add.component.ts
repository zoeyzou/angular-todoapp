import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { TodoItem } from '../shared/todo-item.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  todoItem: TodoItem;

  @ViewChild('form') todoForm: NgForm;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value.item !== '') {
      this.todoItem = new TodoItem(form.value.item);
      this.todoService.addTodo(this.todoItem);
    }
    this.todoForm.reset();
  }
}
