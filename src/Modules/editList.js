function handleEdit(storage, item, value) {
  const stored = storage();
  stored.forEach((object) => {
    if (object.index === Number(item.id)) {
      object.description = value;
      localStorage.setItem('listItems', JSON.stringify(stored));
      const label = item.querySelector('label');
      const icon = item.querySelector('i');
      label.innerHTML = '';
      label.textContent = object.description;

      item.classList.remove('editList');
      icon.classList.remove('fa-trash-can');
      icon.classList.add('fa-ellipsis-v');
    }
  });
}

function editList(item, storage) {
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
      if (e.key === 'Enter') {
        handleEdit(storage, item, editInput.value);
      }
    });
  }
}

export default editList;
