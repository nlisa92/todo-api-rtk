import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout } from "antd";
const { Header: AntHeader, Content } = Layout;

import Header from "./layout/Header";
import TodoPage from "./pages/TodoPage";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";

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
                <TodoPage />
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
