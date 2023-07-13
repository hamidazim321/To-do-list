import { storage } from "./addRemove.js";
function completeTask() {
  let listItems = document.querySelectorAll(".toDoItem");
  let stored = storage();
  listItems.forEach((item) => {
    let checkbox = item.querySelector('input[type="checkbox"]');
    let label = item.querySelector("label");
    checkbox.addEventListener("change", (e) => {
      if (!item.classList.contains("editList")) {
        if (e.target.checked) {
          stored[Number(checkbox.id) - 1].completed = true;
          localStorage.setItem("listItems", JSON.stringify(stored));
          label.style.textDecoration = "line-through";
          console.log("checkIn");
          console.log(Number(checkbox.id));
        } else if (!e.target.checked) {
          label.style.textDecoration = "none";
          stored[Number(checkbox.id) - 1].completed = false;
          localStorage.setItem("listItems", JSON.stringify(stored));
          console.log("checkedOut");
          console.log(Number(checkbox.id));
        }
      }
    });
  });
}

function clearCompleted() {
  let clearButton = document.querySelector("#clearList");
  clearButton.addEventListener("click", () => {
    let counter = 0;
    let stored = storage();
    stored = stored.filter((object) => !object.completed);
    stored.forEach((obj) => {
      if (obj.index > counter + 1) {
        obj.index = counter + 1;
        counter = obj.index;
      }
    });
    localStorage.setItem("listItems", JSON.stringify(stored));
  });
}

export { clearCompleted, completeTask };
