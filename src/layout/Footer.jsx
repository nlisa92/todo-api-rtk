// src/Footer.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../features/auth/authSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          color: "#af4ca5",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Log out
      </button>
    </footer>
  );
};

export default Footer;
