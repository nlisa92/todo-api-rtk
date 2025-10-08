import LoggedTask from "./LoggedTask";
import { useSelector } from "react-redux";

const ToDoList = () => {
  const { tasks } = useSelector((store) => store.tasks);
  return (
    <div className="todo-container">
      {tasks.length === 0 && <h1>Пусто</h1>}
      {tasks.map((item) => (
        <LoggedTask key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
