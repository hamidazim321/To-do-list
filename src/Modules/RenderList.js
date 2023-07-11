import _ from 'lodash'
import '@fortawesome/fontawesome-free/css/all.css';
let listItems = [
  {
    description: 'Exercise',
    completed: false,
    index: 0,
  },
  {
    description: 'Wash car',
    completed: false,
    index: 3,
  },
  {
    description: 'Shopping',
    completed: false,
    index: 2,
  },
  {
    description: 'Study',
    completed: false,
    index: 1,
  }
]

function renderList(){
  const sortedlist = _.sortBy(listItems, 'index')
  let listHolder = document.querySelector('#toDoList')
  const clearButton = listHolder.querySelector('#clearList')
  sortedlist.forEach(item => {
    let li = document.createElement('li')
    let checkBox = document.createElement('input')
    let label = document.createElement('label')
    let icon = document.createElement('i')

    icon.classList.add('fas', 'fa-ellipsis-v')
    checkBox.type = 'checkbox'
    checkBox.id = `Item${item.index}`
    label.for = `Item${item.index}`
    label.textContent = item.description

    li.appendChild(checkBox)
    li.appendChild(label)
    li.appendChild(icon)
    listHolder.insertBefore(li, clearButton)
  })
  
}

export default renderList