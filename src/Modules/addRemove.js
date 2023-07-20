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
      const addForm = document.querySelector('#toDoContainer');
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
            addForm.submit();
          }
        });
      }
    });
  }
}
export {
  storage, changeColor, editList,
};