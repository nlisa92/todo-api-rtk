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

  const handleDownEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(
        editTask({ id: currentTask.id, newTitle: currentTask.editText })
      );
    }
  };

  const handleEditToggle = () => {
    dispatch(toggleEditMode(currentTask.id));
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={currentTask.isDone}
        onChange={() => dispatch(toggleDone(currentTask.id))}
      />
      {!currentTask.isEdit ? (
        <p className={`task-title ${currentTask.isDone ? "active" : ""}`}>
          {currentTask.title}
        </p>
      ) : (
        <input
          className="task-edit-input"
          value={currentTask.editText}
          onChange={(e) =>
            dispatch(
              setEditText({ taskId: currentTask.id, text: e.target.value })
            )
          }
          onKeyDown={handleDownEnter}
        />
      )}
      <div className="task-actions">
        <button onClick={handleEditToggle}>✍</button>
        <button onClick={() => dispatch(deleteTask(currentTask.id))}>❌</button>
      </div>
    </div>
  );
};

export default Task;
