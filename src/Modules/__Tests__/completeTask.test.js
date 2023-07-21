import { completeTask, clearCompleted } from '../completeTask.js';
import 'jest-localstorage-mock';

// Mock the storage function
jest.mock('../storage.js', () => ({
  __esModule: true,
  default: jest.fn(() => [
    { index: 1, description: 'Task 1', completed: false },
    { index: 2, description: 'Task 2', completed: false },
    { index: 3, description: 'Task 3', completed: false }
  ]),
}));

describe('completeTask', () => {
  beforeEach(() => {
    // Clear mock storage before each test
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should mark the correct item completed property to true and then back to false and then in Local Storage', ()=> {
    // Create a test li element with a specific structure
    document.body.innerHTML = `
    <ul id="toDoList">
      <li class="toDoItem" id="1">
        <input type="checkbox" id="1">
        <label for="1">Task 1</label>
        <i class="fas fa-ellipsis-v"></i>
      </li>
      <li class="toDoItem" id="2">
        <input type="checkbox" id="2">
        <label for="2">Task 2</label>
        <i class="fas fa-ellipsis-v"></i>
      </li>
      <li class="toDoItem" id="3">
        <input type="checkbox" id="3">
        <label for="3">Task 3</label>
        <i class="fas fa-ellipsis-v"></i>
      </li>
      <li id="clearButton">
      <button id="clearList">Clear All Completed</button>
      </li>
    </ul>
    `
     // Mock the return value of the storage function
     const mockStorage = jest.fn(() => [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: true } // set 1 to True to Test the clearCompleted function
    ]);

    // call the completeTask function
    completeTask()

    // Simulate the Checkbox Check event for the li with id= 1
    const item1 = document.querySelector('li[id="1"]');
    const checkBox1 = item1.querySelector('input[type="checkbox"]')
    const clearButton = document.querySelector('#clearList')
    checkBox1.checked = true
    const event = new Event('change', { bubbles: true }); // Create a 'change' event
    checkBox1.dispatchEvent(event);

    // Check that the correct object's completed property is set to true
    const storedItemsAfterTrue = JSON.parse(localStorage.getItem('listItems'));
    expect(storedItemsAfterTrue[0].completed).toBe(true)

    // Check that clearList button is enabled when a checkBox is checked
    expect(clearButton.disabled).toBe(false)

    // Uncheck the checkbox to set the item completed property back to false
    checkBox1.checked = false
    checkBox1.dispatchEvent(event);
    const storedItemsAfterFalse = JSON.parse(localStorage.getItem('listItems'));
    expect(storedItemsAfterFalse[0].completed).toBe(false)

    // Check that clearList button is disabled when a checkBox is not checked
    expect(clearButton.disabled).toBe(true)
  })
})

// describe('clearCompleted', () => {
//   beforeEach(() => {
//     // Clear mock storage before each test
//     localStorage.clear();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
  
//   test('Should Remove the Correct Objects from from local Storage that has completed property set to true', ()=> {

//   })
// })