import _ from 'lodash';
import '@fortawesome/fontawesome-free/css/all.css';
import { storage, addList, changeColor, editList} from './addRemove.js';
function renderList() {
  let listItems = storage()
  let listHolder = document.querySelector('#toDoList');
  listHolder.innerHTML = `<li id="title">Today's To Do <i class="fa-solid fa-rotate"></i></li>
  <li><input id="addItem" type="text" placeholder="Add Your list..."><button id="addButton" type="Submit" ><i class="fas fa-arrow-left"></i></button></li>
  <button id="clearList">Clear All Completed</button>`
  const clearButton = listHolder.querySelector('#clearList');
  listItems.forEach((item) => {
    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const icon = document.createElement('i');

    icon.classList.add('fas', 'fa-ellipsis-v');
    li.classList.add('toDoItem')
    checkBox.type = 'checkbox';
    checkBox.id = item.index;
    li.id = item.index
    label.for = item.index;
    label.textContent = item.description;

    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(icon);
    listHolder.insertBefore(li, clearButton);
  });
}

function updateList() {
  renderList()
  let listContainer = document.querySelector('#toDoList')
  let addInput = listContainer.querySelector('#addItem')
  let addForm = document.querySelector('#toDoContainer')
  addForm.addEventListener('submit', ()=>{
    const value = addInput.value
    if (value !== ""){
      addList(value)
      renderList()
    }
  })

  let toDoItems = document.querySelectorAll('.toDoItem')
  toDoItems.forEach(item => {
    const icon = item.querySelector('i')
    icon.addEventListener('click', ()=>{
      changeColor(item)
      editList(item)
    })
  })

}

export {updateList, renderList};