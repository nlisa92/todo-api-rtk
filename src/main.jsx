import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";

import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
