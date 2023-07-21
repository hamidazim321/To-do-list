import storage from './storage.js';

function handleCheckBox(clearButton, target, label) {
  const stored = storage();
  if (target.checked) {
    clearButton.disabled = false;
    stored.find(obj => obj.index === Number(target.id)).completed = true
    localStorage.setItem('listItems', JSON.stringify(stored));
    label.style.textDecoration = 'line-through';
  } else if (!target.checked) {
    clearButton.disabled = true;
    label.style.textDecoration = 'none';
    stored.find(obj => obj.index === Number(target.id)).completed = false
    localStorage.setItem('listItems', JSON.stringify(stored));
  }
}

function completeTask() {
  const listItems = document.querySelectorAll('.toDoItem');
  const clearButton = document.querySelector('#clearList');
  listItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const label = item.querySelector('label');
    checkbox.addEventListener('change', (e) => {
      if (!item.classList.contains('editList')) {
        handleCheckBox(clearButton, e.target, label)
      }
    });
  });
}

function clearCompleted() {
  const clearButton = document.querySelector('#clearList');
  clearButton.addEventListener('click', () => {
    let counter = 0;
    let stored = storage();
    stored = stored.filter((object) => !object.completed);
    stored.forEach((obj) => {
      if (obj.index >= counter + 1) {
        obj.index = counter + 1;
        counter = obj.index;
      }
    });
    localStorage.setItem('listItems', JSON.stringify(stored));
  });
}

export { clearCompleted, completeTask };
