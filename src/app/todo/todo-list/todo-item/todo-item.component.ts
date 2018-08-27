import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { TodoItem } from '../../shared/todo-item.model';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TodoItem;
  @Input() id: number;

  @ViewChild('todoItem') item: ElementRef;

  editMode = false;


  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }


  onDeleteItem() {
    console.log(this.id);
    this.todoService.deleteTodo(this.id);
  }

  onChangeStatus() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoService.changeTodo(this.id, this.todo);
  }

  onEditItem() {
    if (this.editMode) {
      return this.editMode = false;
    }
    this.editMode = true;
    console.log(this.item.nativeElement);
    this.item.nativeElement.focus();
    console.log(this.id);
  }

  discardEdit() {
    this.editMode = false;
    console.log(this.editMode);
  }

  onSave(newTodo: string) {
    console.log('its saved');
    console.log(newTodo);
    this.editMode = false;
    this.todo.itemName = newTodo;
    this.todoService.changeTodo(this.id, this.todo);
  }

}
