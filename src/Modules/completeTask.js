import { storage } from './addRemove.js';

function completeTask() {
  const listItems = document.querySelectorAll('.toDoItem');
  const clearButton = document.querySelector('#clearList');
  const stored = storage();
  listItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const label = item.querySelector('label');
    checkbox.addEventListener('change', (e) => {
      if (!item.classList.contains('editList')) {
        if (e.target.checked) {
          clearButton.disabled = false;
          stored[Number(checkbox.id) - 1].completed = true;
          localStorage.setItem('listItems', JSON.stringify(stored));
          label.style.textDecoration = 'line-through';
        } else if (!e.target.checked) {
          clearButton.disabled = true;
          label.style.textDecoration = 'none';
          stored[Number(checkbox.id) - 1].completed = false;
          localStorage.setItem('listItems', JSON.stringify(stored));
        }
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
    // let toDoItems = document.querySelectorAll('.toDoItem')
    // // toDoItems.forEach(item => {
    // //   try {
    // //     let button = item.querySelector('input[type="text"]')
    // //     let {value} = button
    // //     let label = item.querySelector('label')
    // //     label.innerHTML = ""
    // //     label.textContent = value
    // //   }
    // //   catch{}
    // // })
    localStorage.setItem('listItems', JSON.stringify(stored));
  });
}

export { clearCompleted, completeTask };
