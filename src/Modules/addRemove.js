function storage(){
  let storedList = []
  try {
    storedList = localStorage.getItem('listItems')
    storedList = JSON.parse(storedList)
  }
  catch {
    storedList = []
  }
  if (! Array.isArray(storedList)) {
    storedList = []
  }
  return storedList;
}

function addList(newValue){
  let storedItems = storage()
  let newIndex = storedItems.length
  let newObject = {
      description: newValue,
      completed: false,
      index: newIndex,
  }
  storedItems.push(newObject)
  localStorage.setItem('listItems', JSON.stringify(storedItems))
}

export {storage, addList}