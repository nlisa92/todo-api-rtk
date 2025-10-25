import { useDispatch, useSelector } from "react-redux";
import { change, zero } from "./redux/slice/inputSlice";
import { createTasks } from "./redux/slice/tasksSlice";

function InputTask() {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.text);

  const handleChange = (e) => {
    dispatch(change(e.target.value));
  };

  const handleClick = async () => {
    const trimmed = value.trim();

    if (!trimmed) return;

    await dispatch(createTasks(trimmed));

    dispatch(zero());
  };
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        placeholder="What is the task today..."
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
}

export default InputTask;
