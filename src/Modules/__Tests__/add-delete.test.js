// Import the functions to be tested
import addList from '../addList.js';
import deleteElement from '../deleteItem';

// Import the `jest-localstorage-mock` library to mock localStorage
import 'jest-localstorage-mock';

describe('addList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new item to localStorage', () => {
    // Call the function with some test data
    addList('Task 1');

    // Retrieve the data from localStorage
    const storedItems = JSON.parse(localStorage.getItem('listItems'));

    // Check if the correct value was added to localStorage
    expect(storedItems).toHaveLength(1);
    expect(storedItems[0].description).toBe('Task 1');
    expect(storedItems[0].completed).toBe(false);
    expect(storedItems[0].index).toBe(1);
  });

  test('should add multiple items to localStorage', () => {
    // Call the function multiple times with different test data
    addList('Task 1');
    addList('Task 2');

    // Retrieve the data from localStorage
    const storedItems = JSON.parse(localStorage.getItem('listItems'));

    // Check if the correct values were added to localStorage with correct indexes
    expect(storedItems).toHaveLength(2);
    expect(storedItems[0].description).toBe('Task 1');
    expect(storedItems[1].description).toBe('Task 2');
    expect(storedItems[0].index).toBe(1);
    expect(storedItems[1].index).toBe(2);
  });
});

describe('deleteElement from List and Local Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new item to localStorage and then delete it', () => {
    // Call the addList function with some test data
    addList('Task 1');

    // Retrieve the data from localStorage after adding an item
    const storedItems = JSON.parse(localStorage.getItem('listItems'));

    // Check if the correct value was added to localStorage
    expect(storedItems).toHaveLength(1);
    expect(storedItems[0].description).toBe('Task 1');
    expect(storedItems[0].completed).toBe(false);
    expect(storedItems[0].index).toBe(1);
    // Create a DOM element similar to the one expected by deleteElement function
    const listItemToDelete = document.createElement('li');
    listItemToDelete.className = 'toDoItem editList';
    listItemToDelete.id = '1';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = '1';
    listItemToDelete.appendChild(checkbox);

    const label = document.createElement('label');
    label.htmlFor = '1';
    label.textContent = 'Task 1';
    listItemToDelete.appendChild(label);

    const ellipsis = document.createElement('i');
    ellipsis.className = 'fas fa-ellipsis-v';
    listItemToDelete.appendChild(ellipsis);

    // Mock the list element
    const list = document.createElement('ul');
    list.id = 'toDoList';
    list.appendChild(listItemToDelete);
    document.body.appendChild(list);
  // Mock the removeChild method of the list element
    list.removeChild = jest.fn();

    // Call the deleteElement function with the DOM element
    deleteElement(listItemToDelete);

    // Retrieve the data from localStorage after deleting the item
    const storedItemsAfterDelete = JSON.parse(localStorage.getItem('listItems'));

    // Check if the item was correctly removed from localStorage
    expect(storedItemsAfterDelete).toHaveLength(0);

    // Verify that the removeChild method was called with the correct item
    expect(list.removeChild).toHaveBeenCalledWith(listItemToDelete);
  });
});