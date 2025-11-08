import { useDispatch } from "react-redux";
import {
  deleteTask,
  toggleDone,
  editTask,
  toggleEditMode,
  setEditText,
  toggleDoneOptimistic
} from "./redux/slice/tasksSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(editTask({ id: task.id, newTitle: task.editText }));
    }
  };

  const handleToggleEdit = () => {
    dispatch(toggleEditMode(task.id));
  };

  const handleToggleDone = () => {
    // Оптимистично обновляем локальный state
    dispatch(toggleDoneOptimistic(task.id));
    // Асинхронно синхронизируем с сервером
    dispatch(toggleDone({ id: task.id, isDone: task.isCompleted }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="task-item">
      {!task.isEdit ? (
        <p
          className={`task-title ${task.isCompleted ? "completed" : ""}`}
          onClick={handleToggleDone}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {task.title}
        </p>
      ) : (
        <input
          autoFocus
          className="task-edit-input"
          value={task.editText}
          onChange={(e) =>
            dispatch(setEditText({ taskId: task.id, text: e.target.value }))
          }
          onKeyDown={handleKeyDown}
        />
      )}

      <div className="task-actions">
        <button onClick={handleToggleEdit}>✍</button>
        <button onClick={handleDelete}>❌</button>
      </div>
    </div>
  );
};

export default Task;
