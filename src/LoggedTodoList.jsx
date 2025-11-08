import TodoList from "./TodoList";
import withLogger from "./withLogger";

const LoggedTodoList = withLogger(TodoList);
export default LoggedTodoList;
