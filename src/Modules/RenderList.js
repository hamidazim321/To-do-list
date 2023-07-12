import _ from 'lodash';
import '@fortawesome/fontawesome-free/css/all.css';
import { storage, addList} from './addRemove.js';

function renderList() {
  let listItems = storage()
  let listHolder = document.querySelector('#toDoList');
  listHolder.innerHTML = `<li id="title">Today's To Do <i class="fa-solid fa-rotate"></i></li>
  <li><input id="addItem" type="text" placeholder="Add Your list..." required><button id="addButton" type="Submit" ><i class="fas fa-arrow-left"></i></button></li>
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
    checkBox.id = `Item${item.index}`;
    label.for = `Item${item.index}`;
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
    console.log('eusifv')
    const value = addInput.value
    if (value !== ""){
      addList(value)
      renderList()
    }
  })
}

export {updateList, renderList};