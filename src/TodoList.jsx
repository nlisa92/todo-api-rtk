import { useEffect } from "react";
import LoggedTask from "./LoggedTask";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./redux/slice/tasksSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);
  return (
    <div className="todo-container">
      {status === "loading" && <h2>Загрузка задач...</h2>}

      {status === "failed" && <h2 style={{ color: "red" }}>Ошибка: {error}</h2>}

      {status === "succeeded" && tasks.length === 0 && <h1>no tasks</h1>}

      {status === "succeeded" &&
        tasks.map((item) => <LoggedTask key={item.id} task={item} />)}
    </div>
  );
};

export default ToDoList;
