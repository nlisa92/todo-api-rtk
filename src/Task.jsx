import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  toggleDone,
  editTask,
  toggleEditMode,
  setEditText,
} from "./redux/slice/tasksSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === task.id)
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(
        editTask({ id: currentTask.id, newTitle: currentTask.editText })
      );
    }
  };

  const handleToggleEdit = () => {
    dispatch(toggleEditMode(currentTask.id));
  };

  const handleToggleDone = () => {
    // ✅ передаём объект, как ожидает thunk
    dispatch(
      toggleDone({
        id: currentTask.id,
        isDone: currentTask.isCompleted, // ⚠️ поле из твоего состояния
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTask(currentTask.id));
  };

  return (
    <div className="task-item">
      {!currentTask.isEdit ? (
        <p
          className={`task-title ${currentTask.isCompleted ? "active" : ""}`}
          onClick={handleToggleDone}
        >
          {currentTask.title}
        </p>
      ) : (
        <input
          autoFocus
          className="task-edit-input"
          value={currentTask.editText}
          onChange={(e) =>
            dispatch(
              setEditText({ taskId: currentTask.id, text: e.target.value })
            )
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
