import { Selector } from 'testcafe';

export class TodoPo {

  constructor() {
    this.input = Selector('.new-todo');
    this.editInput = Selector('.edit').with({visibilityCheck: true});
    this.todoItems = Selector('.todo-list li');
    this.firstTodoItem = Selector('.todo-list li:nth-child(1)');
    this.completedTodos = Selector('.completed');
    this.completeAll = Selector('.toggle-all');
    this.deleteCompleted = Selector('.clear-completed');
    this.showActiveLink = Selector('[href="#/active"]');
    this.showCompletedLink = Selector('[href="#/completed"]');
  }
}