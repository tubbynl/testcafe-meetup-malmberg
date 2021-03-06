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
test('Complete one todo', async t => {

  // create 2 todo items
    await t
        .typeText('input.new-todo','niet check')
        .pressKey('enter')
        .typeText('input.new-todo','wel check')
        .pressKey('enter')

  // complete first todo item
    const firstTodoItem = Selector('ul.todo-list').child(0)
    await t.click(firstTodoItem.find('input.toggle'))

  // assert first todo item has class completed

    await t.expect(firstTodoItem.hasClass('completed')).ok('test');

});

// #6
test('Show active/completed todos', async t => {

  // create 2 todo items
    await t
        .typeText('input.new-todo','eentje')
        .pressKey('enter')
        .typeText('input.new-todo','tweetje')
        .pressKey('enter')
        // complete first todo item
        .click(Selector('ul.todo-list').child(0).find('input.toggle'))

  // when click on show active
    const activeFilterLink = Selector('ul.filters').child(1).find('a')
    await t.click(activeFilterLink)
            .expect(Selector('ul.todo-list')
            // assert todo text equals second input todo item
            .child(0).textContent).eql('tweetje')

  // when click on show completed
    const completedFilterLink = Selector('ul.filters').child(2).find('a')
    await t.click(completedFilterLink)
        .expect(Selector('ul.todo-list')
        // assert todo text equals first input todo item
            .child(0).textContent).eql('eentje')

});

// #7
test('Complete all todos', async t => {
  // create 4 todo items
    await t
        .typeText('input.new-todo','eeeen')
        .pressKey('enter')
        .typeText('input.new-todo','tweeeeee')
        .pressKey('enter')
        .typeText('input.new-todo','drieeeeeeee')
        .pressKey('enter')
        .typeText('input.new-todo','vieeeeeeeerrrrrrr')
        .pressKey('enter')

  // complete all todo items
    const toggleAll = Selector('input.toggle-all')
    await t.click(toggleAll)

  // assert 4 todo items completed
    await t.expect(Selector('ul.todo-list').child('li.completed').count).eql(4, 'expected 4 completed items')
});

// #8
test('Delete all completed todos', async t => {

  // create 4 todo items
    await t
        .typeText('input.new-todo','eeeen')
        .pressKey('enter')
        .typeText('input.new-todo','tweeeeee')
        .pressKey('enter')
        .typeText('input.new-todo','drieeeeeeee')
        .pressKey('enter')
        .typeText('input.new-todo','vieeeeeeeerrrrrrr')
        .pressKey('enter')
        // complete all todo items
        .click('input.toggle-all')

  // delete all completed items
    const deleteAll = Selector('button.clear-completed')
    await t.click(deleteAll)

  // assert 0 todo items in todo list
    await t.expect(Selector('ul.todo-list').child().count).eql(0, 'expected 0 todo items')
});
