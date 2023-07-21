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

export default storage;