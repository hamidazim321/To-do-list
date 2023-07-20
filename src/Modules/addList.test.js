// Import the function to be tested
import addList from './addList';

// Mock for localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test suite for the addList function
describe('addList', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should add a new item to localStorage', () => {
    addList('New Task');
    const storedItems = JSON.parse(localStorage.getItem('listItems'));
    expect(storedItems).toHaveLength(1);
    expect(storedItems[0].description).toBe('New Task');
    expect(storedItems[0].completed).toBe(false);
    expect(storedItems[0].index).toBe(1);
  });

  test('should add multiple items to localStorage', () => {
    addList('Task 1');
    addList('Task 2');
    const storedItems = JSON.parse(localStorage.getItem('listItems'));
    expect(storedItems).toHaveLength(2);
    expect(storedItems[0].description).toBe('Task 1');
    expect(storedItems[1].description).toBe('Task 2');
  });

  test('should correctly update the index', () => {
    // Add two items
    addList('Task 1');
    addList('Task 2');

    // Add one more item
    addList('New Task');

    const storedItems = JSON.parse(localStorage.getItem('listItems'));
    expect(storedItems).toHaveLength(3);
    expect(storedItems[0].index).toBe(1);
    expect(storedItems[1].index).toBe(2);
    expect(storedItems[2].index).toBe(3);
  });
});
