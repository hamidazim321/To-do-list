import editList from '../editList.js';
import 'jest-localstorage-mock';

// Mock the storage function
jest.mock('../storage.js', () => ({
  __esModule: true,
  default: jest.fn(() => [
    { index: 1, description: 'Task 1', completed: false },
  ]),
}));

describe('editList', () => {
  beforeEach(() => {
    // Clear mock storage before each test
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should edit a list item', () => {
    // Create a test li element with a specific structure
    document.body.innerHTML = `
      <ul id="toDoList">
        <li class="toDoItem" id="1">
          <input type="checkbox" id="1">
          <label for="1">Task 1</label>
          <i class="fas fa-ellipsis-v"></i>
        </li>
      </ul>
    `;

    // Mock the return value of the storage function
    const mockStorage = jest.fn(() => [
      { index: 1, description: 'Task 1', completed: false },
    ]);

    // Call the editList function with the li element and the mockStorage function
    const li = document.querySelector('.toDoItem');
    editList(li, mockStorage);

    // Simulate the 'Enter' keypress event to trigger the update in the localStorage
    const editInput = document.querySelector('.editInput');
    editInput.value = 'Task 1 Edited';
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    editInput.dispatchEvent(event);

    // Check if the description of the item in localStorage has been updated
    const storedItemsAfterEdit = JSON.parse(localStorage.getItem('listItems'));
    expect(storedItemsAfterEdit).toHaveLength(1);
    expect(storedItemsAfterEdit[0].description).toBe('Task 1 Edited');
  });
});
