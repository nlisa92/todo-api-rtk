import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout } from "antd";
const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./TodoList";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Layout style={{}}>
      {token && (
        <AntHeader style={{ backgroundColor: "#fefefe" }}>
          <Header />
        </AntHeader>
      )}

      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <div style={{ maxWidth: 600, margin: "0 auto" }}>
                  <InputTask />
                  <ToDoList />
                  <AntFooter style={{ textAlign: "center" }}>
                    <Footer />
                  </AntFooter>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/todo" : "/login"} />}
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
