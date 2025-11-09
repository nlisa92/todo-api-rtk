import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedTask from "./LoggedTask";
import { getTasks } from "../tasksSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const { tasks, loadingList, error } = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loadingList) return <h2>Loading tasks...</h2>;
  if (error) return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  if (tasks.length === 0) return <h2>The task list is empty.</h2>;

  return (
    <div className="todo-container">
      {tasks.map((task) => (
        <LoggedTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ToDoList;
