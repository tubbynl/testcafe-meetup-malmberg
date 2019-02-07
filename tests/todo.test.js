import { TodoPo } from './po/todo.po';
import { Selector } from 'testcafe';

// #1: page under test is http://todomvc.com/examples/vanillajs/
fixture('Test TodoMVC App')
    .page('http://todomvc.com/examples/vanillajs/')

// #2
test('Create todo', async t => {

    // create todo item
    await t
        .typeText('input.new-todo','tubs vette todo')
        .pressKey('enter')

    // assert 1 item in list
    const todoItems = Selector('ul.todo-list').child('li')
    await t.expect(todoItems.count).eql(1, 'expected 1 todo item')

    // assert list contains the input item
    await t.expect(todoItems.nth(0).textContent).eql('tubs vette todo')

});

// #3
test('Edit todo', async t => {

    // create a todo item
    await t
        .typeText('input.new-todo','driedo')
        .pressKey('enter')

    // edit the created todo item
    const lastTodoItem = Selector('ul.todo-list').child('li')
    await t
        .doubleClick(lastTodoItem)
        .typeText(lastTodoItem.find('input.edit'),'oooo.0.oooo')
        .pressKey('enter')

    // assert changed item in text in todo item
    await t.expect(lastTodoItem.textContent).eql('driedooooo.0.oooo')

});

// #4
test('Delete todo', async t => {

  // create 2 todo items
    await t
        .typeText('input.new-todo','tododelete')
        .pressKey('enter')
        .typeText('input.new-todo','todonotdelete')
        .pressKey('enter')
    await t.expect(Selector('ul.todo-list').child().count).eql(2, 'expected 2 todo items')

  // delete first todo item
    const firstTodoItem = Selector('ul.todo-list').child(0)
    await t.hover(firstTodoItem)
        .click(firstTodoItem.find('button.destroy'))

  // assert 1 item in todo list
    await t.expect(Selector('ul.todo-list').child().count).eql(1, 'expected 1 todo item')

  // assert todo text equals second input todo item
    await t.expect(firstTodoItem.textContent).eql('todonotdelete')

});

// #5
test.skip('Complete one todo', async t => {

  // create 2 todo items

  // complete first todo item

  // assert first todo item has class completed

});

// #6
test.skip('Show active/completed todos', async t => {

  // create 2 todo items

  // complete first todo item

  // when click on show active

  // assert todo text equals second input todo item

  // when click on show completed

  // assert todo text equals first input todo item

});

// #7
test.skip('Complete all todos', async t => {
  // create 4 todo items

  // complete all todo items

  // assert 4 todo items completed
});

// #8
test.skip('Delete all completed todos', async t => {

  // create 4 todo items

  // complete all todo items

  // delete all completed items

  // assert 0 todo items in todo list
});
