function changeColor(item) {
  const icon = item.querySelector('i');
  if (icon.classList.contains('fa-ellipsis-v')) {
    icon.classList.remove('fa-ellipsis-v');
    icon.classList.add('fa-trash-can');
    item.classList.add('editList');
  }
}

export default changeColor;