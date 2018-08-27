import { Component, OnInit, Input, ElementRef, ViewChild, Renderer, AfterViewInit, DoCheck, Renderer2, OnChanges, SimpleChange } from '@angular/core';
import { TodoItem } from '../../shared/todo-item.model';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, DoCheck {

  @Input() todo: TodoItem;
  @Input() id: number;

  @ViewChild('todoItem') item: ElementRef;

  editMode = false;
  selectedItem;


  constructor(private todoService: TodoService,
              private renderer1: Renderer,
              private renderer2: Renderer2) { }

  ngOnInit() {
    if (this.selectedItem) {
      console.log(this.selectedItem);
      this.renderer2.selectRootElement(this.selectedItem).focus();
    }
  }


  ngDoCheck() {
    // this.renderer1.invokeElementMethod(this.item.nativeElement, 'focus');
    // console.log(`#input${this.id}`);
    // console.log('docheck');
    // console.log(this.item.nativeElement);
    this.renderer2.selectRootElement(this.item.nativeElement).focus();

  }


  onDeleteItem() {
    console.log(this.id);
    this.todoService.deleteTodo(this.id);
  }

  onChangeStatus() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoService.changeTodo(this.id, this.todo);
  }

  onEditItem(todoItem) {
    // console.log(todoItem);
    // this.selectedItem = todoItem;
    if (this.editMode) {
      return !this.editMode;
    }
    this.editMode = true;
    // console.log(this.item.nativeElement);
      // this.renderer2.selectRootElement(this.selectedItem).focus();
    console.log(this.id);
  }

  discardEdit(todoItem) {
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
