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

function changeColor(item){
  let icon = item.querySelector('i')
  if (icon.classList.contains('fa-ellipsis-v')){
  icon.classList.remove('fa-ellipsis-v')
  icon.classList.add('fa-trash-can')
  item.classList.add('editList')
  }
}

function removeElement(item) {
  let stored = storage()

}

function editList(item) {
  let label = item.querySelector('label')
  let editInput = document.createElement('input')
  const labelValue = label.textContent
  editInput.classList.add('editInput')
  editInput.type = 'text'
  if (labelValue !== ""){
  editInput.value = labelValue
  label.textContent = ""
  label.appendChild(editInput)
  editInput.focus()

  editInput.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter'){
      let stored = storage()
      stored.forEach(object => {
        if (object.index == item.id){
          object.description = editInput.value
          localStorage.setItem('listItems', JSON.stringify(stored))
          let label = item.querySelector('label')
          let icon = item.querySelector('i')
          label.innerHTML = ""
          label.textContent = object.description

          item.classList.remove('editList')
          icon.classList.remove('fa-trash-can')
          icon.classList.add('fa-ellipsis-v')
        }
      
      })
    }
  })
}

}
export {storage, addList, changeColor, editList}