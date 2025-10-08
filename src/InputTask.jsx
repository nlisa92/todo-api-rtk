import { useDispatch, useSelector } from "react-redux";
import { textAction } from "./redux/actions/inputActions";
import { addTask } from "./redux/actions/tasksActions";

function InputTask() {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.text);

  const handleChange = (e) => {
    dispatch(textAction(e.target.value));
  };

  const addNewTask = async (value) => {
    dispatch(addTask(value));
  };

  const handleClick = () => {
    if (value.trim()) {
      addNewTask(value);
      dispatch({ type: "zero" });
    }
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
