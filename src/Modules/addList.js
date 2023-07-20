function addList(newValue) {
  const storedItems = JSON.parse(localStorage.getItem('listItems'))
  const newIndex = storedItems.length + 1;
  const newObject = {
    description: newValue,
    completed: false,
    index: newIndex,
  };
  storedItems.push(newObject);
  localStorage.setItem('listItems', JSON.stringify(storedItems));
}

export default addList