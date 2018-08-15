import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoStatComponent } from './todo-stat/todo-stat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TodoItemComponent, TodoStatComponent]
})
export class TodoModule { }
