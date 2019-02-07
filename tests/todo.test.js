import { Selector} from 'testcafe';
import { TodoPo } from "./po/todo.po";

const todoPage = new TodoPo();

fixture('Test TodoMVC App')
  .page('http://todomvc.com/examples/vanillajs/');


test('Create todo', async t => {
  await t.typeText(todoPage.input, 'explore TestCafe')
    .pressKey('enter');

  await t.expect(todoPage.todoItems.count)
    .eql(1);

  await t.expect(todoPage.todoItems.nth(0).textContent).eql('explore TestCaf');
  await t.expect(todoPage.firstTodoItem.textContent)
    .contains('explore TestCafe');
});


test.skip('Edit todo', async t => {
  await t.typeText(todoPage.input, 'explore TestCafe')
    .pressKey('enter');

  await t.doubleClick(todoPage.firstTodoItem)
    .selectText(todoPage.editInput, 8)
    .pressKey('backspace')
    .typeText(todoPage.editInput, 'something different')
    .pressKey('enter');

  await t.expect(todoPage.firstTodoItem.textContent)
    .contains('explore something different');
});


test.skip('Delete todo', async t => {
  await t.typeText(todoPage.input, 'explore TestCafe')
    .pressKey('enter')
    .typeText(todoPage.input, 'buy some beer')
    .pressKey('enter');

  await t.expect(todoPage.todoItems.count)
    .eql(2);

  await t.hover(todoPage.firstTodoItem)
    .click(todoPage.todoItems.nth(0).find('.destroy'));

  await t.expect(todoPage.todoItems.count)
    .eql(1);

  await t.expect(todoPage.firstTodoItem.textContent)
    .contains('buy some beer');
});


test.skip('Complete one todo', async t => {
  await t.typeText(todoPage.input, 'explore TestCafe')
    .pressKey('enter')
    .typeText(todoPage.input, 'buy some beer')
    .pressKey('enter');

  await t.click(todoPage.todoItems.nth(0).find('.toggle'));

  await t.expect(todoPage.todoItems.nth(0).hasClass('completed')).ok();

  await t.expect(todoPage.todoItems.count).eql(2);
});


test.skip('Show active/completed todos', async t => {
  await t.typeText(todoPage.input, 'explore TestCafe')
    .pressKey('enter')
    .typeText(todoPage.input, 'buy some beer')
    .pressKey('enter');

  await t.click(todoPage.todoItems.nth(0).find('.toggle'));

  await t.expect(todoPage.todoItems.count)
    .eql(2);

  // when click on show active
  await t.click(todoPage.showActiveLink);

  await t.expect(todoPage.todoItems.nth(0).textContent)
    .contains('buy some beer');

  // when click on show completed
  await t.click(await Selector(todoPage.showCompletedLink));

  await t.expect(todoPage.firstTodoItem.textContent)
    .contains('explore TestCafe');
});


test.skip('Complete all todos', async t => {
  await t.typeText(todoPage.input, 'explore TestCafe')
    .pressKey('enter')
    .typeText(todoPage.input, 'buy some beer')
    .pressKey('enter')
    .typeText(todoPage.input, 'watch a movie')
    .pressKey('enter')
    .typeText(todoPage.input, 'go to a meeting')
    .pressKey('enter');

  await t.expect(todoPage.todoItems.count)
    .eql(4)
    .expect(todoPage.completedTodos.count)
    .eql(0);

  await t.click(todoPage.completeAll);

  await t.expect(todoPage.completedTodos.count)
    .eql(4);
});


test.skip('Delete all completed todos', async t => {

  let todos = ['explore TestCafe', 'buy some beer', 'watch a movie', 'go to a meeting'];

  for (let todo of todos)
    await t.typeText(todoPage.input, todo)
      .pressKey('enter');

  await t.expect(todoPage.todoItems.count)
    .eql(todos.length);

  await t.click(todoPage.completeAll)
    .click(todoPage.deleteCompleted);

  await t.expect(todoPage.todoItems.count)
    .eql(0);
});
