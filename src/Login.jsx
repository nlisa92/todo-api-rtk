import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/slice/authSlice";
import { useNavigate } from "react-router";
import { Form, Input, Button, Typography, Card, message } from "antd";

const { Title, Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    const result = await dispatch(loginUser(values));
    setLoading(false);

    if (loginUser.fulfilled.match(result)) {
      message.success("Successfully logged in!");
      navigate("/todo");
    } else {
      message.error(result.payload || "Login error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          borderRadius: 12,
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Sign In
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          {error && (
            <Text type="danger" style={{ display: "block", marginBottom: 12 }}>
              {error}
            </Text>
          )}

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              block
              loading={loading || status === "loading"}
              style={{
                backgroundColor: "#af4ca5",
                borderColor: "#af4ca5",
                color: "#fff",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d36cd1";
                e.currentTarget.style.borderColor = "#d36cd1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#af4ca5";
                e.currentTarget.style.borderColor = "#af4ca5";
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text>
            No account?{" "}
            <a
              onClick={() => navigate("/register")}
              style={{ fontWeight: 500, color: "#af4ca5" }}
            >
              Sign Up
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
}
