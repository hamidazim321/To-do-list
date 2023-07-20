// Import the function to be tested
import addList from '../addList';

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
