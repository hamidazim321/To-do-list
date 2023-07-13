import "./style.css";
import { updateList } from "./Modules/RenderList.js";
import { clearCompleted, completeTask } from "./Modules/completeTask.js";
updateList();
completeTask();
clearCompleted();
