import { TodoPo } from './po/todo.po';

// #1: page under test is http://todomvc.com/examples/vanillajs/
fixture('Test TodoMVC App')

// #2
test.skip('Create todo', async t => {

  // create todo item

  // assert 1 item in list

  // assert list contains the input item

});

// #3
test.skip('Edit todo', async t => {

  // create a todo item

  // edit the created todo item

  // assert changed item in text in todo item

});

// #4
test.skip('Delete todo', async t => {

  // create 2 todo items

  // delete first todo item

  // assert 1 item in todo list

  // assert todo text equals second input todo item

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
