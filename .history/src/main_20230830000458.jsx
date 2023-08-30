import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/theme.tsx";
import { CustomizeProvider } from "./context/customizeState.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CustomizeProvider>

      <App />
      </CustomizeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
