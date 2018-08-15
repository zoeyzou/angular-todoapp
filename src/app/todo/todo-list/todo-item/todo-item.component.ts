import { Component, OnInit, Input } from '@angular/core';
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

  editMode = false;


  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }


  onDeleteItem() {
    this.todoService.deleteTodo(this.id);
  }

  onChangeStatus() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoService.changeTodo(this.id, this.todo);
  }

  onEditItem() {
    this.editMode = true;
    console.log(this.editMode);
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
