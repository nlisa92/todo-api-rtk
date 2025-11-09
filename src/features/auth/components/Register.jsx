import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice";
import { useNavigate } from "react-router";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Select,
  InputNumber,
  message,
} from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    const result = await dispatch(registerUser(values));
    setLoading(false);

    if (registerUser.fulfilled.match(result)) {
      message.success("Registration successful!");
      navigate("/login");
    } else {
      message.error(result.payload || "Registration error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 450,
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          borderRadius: 12,
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Create an Account
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" size="large" />
          </Form.Item>

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

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder="Select gender" size="large">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <InputNumber
              min={1}
              max={120}
              style={{ width: "100%" }}
              placeholder="Enter your age"
              size="large"
            />
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text>
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              style={{ fontWeight: 500, color: "#af4ca5" }}
            >
              Log in
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
}
