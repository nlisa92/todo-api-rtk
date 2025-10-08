const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addTask":
      const newTask = {
        id: Date.now(),
        title: action.payload,
        isDone: false,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case "deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "toggleDone":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, isDone: !task.isDone } : task
        ),
      };

    case "editTask":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.newTitle }
            : task
        ),
      };

    case "toggleEditMode":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isEdit: !task.isEdit, editText: task.title }
            : task
        ),
      };

    case "setEditText":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, editText: action.payload.text }
            : task
        ),
      };
    default:
      return state;
  }
};

export default tasksReducer;
