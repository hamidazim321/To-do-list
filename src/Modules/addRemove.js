function storage() {
  let storedList = [];
  try {
    storedList = localStorage.getItem('listItems');
    storedList = JSON.parse(storedList);
  } catch {
    storedList = [];
  }
  if (!Array.isArray(storedList)) {
    storedList = [];
  }
  return storedList;
}

function addList(newValue) {
  const storedItems = storage();
  const newIndex = storedItems.length + 1;
  const newObject = {
    description: newValue,
    completed: false,
    index: newIndex,
  };
  storedItems.push(newObject);
  localStorage.setItem('listItems', JSON.stringify(storedItems));
}

function deleteElement(item) {
  if (item.classList.contains('editList')) {
    let stored = storage();
    const list = document.querySelector('#toDoList');
    const index = Number(item.id);
    stored = stored.filter((object) => object.index !== index);
    list.removeChild(item);
    stored.forEach((object) => {
      if (object.index > index) { object.index -= 1; }
    });
    localStorage.setItem('listItems', JSON.stringify(stored));
    return true;
  }

  return false;
}

function changeColor(item) {
  const icon = item.querySelector('i');
  if (icon.classList.contains('fa-ellipsis-v')) {
    icon.classList.remove('fa-ellipsis-v');
    icon.classList.add('fa-trash-can');
    item.classList.add('editList');
  }
}

function editList(item) {
  const label = item.querySelector('label');
  const editInput = document.createElement('input');
  const labelValue = label.textContent;
  editInput.classList.add('editInput');
  editInput.type = 'text';
  if (labelValue !== '') {
    editInput.value = labelValue;
    label.textContent = '';
    label.appendChild(editInput);
    editInput.focus();

    editInput.addEventListener('keypress', (e) => {
      let addForm = document.querySelector('#toDoContainer')
      if (e.key === 'Enter') {
        const stored = storage();
        stored.forEach((object) => {
          if (object.index === Number(item.id)) {
            object.description = editInput.value;
            localStorage.setItem('listItems', JSON.stringify(stored));
            const label = item.querySelector('label');
            const icon = item.querySelector('i');
            label.innerHTML = '';
            label.textContent = object.description;

            item.classList.remove('editList');
            icon.classList.remove('fa-trash-can');
            icon.classList.add('fa-ellipsis-v');
            addForm.submit()
          }
        });
      }
    });
  }
}
export {
  storage, addList, changeColor, editList, deleteElement,
};