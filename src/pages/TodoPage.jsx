import { Layout } from "antd";
import InputTask from "../features/input/components/InputTask";
import ToDoList from "../features/tasks/components/TodoList";
import Footer from "../layout/Footer";


const { Footer: AntFooter } = Layout;

const TodoPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <InputTask />
      <ToDoList />
      <AntFooter style={{ textAlign: "center" }}>
        <Footer />
      </AntFooter>
    </div>
  );
};

export default TodoPage;
