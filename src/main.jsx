import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/theme.tsx";
import { CustomizeProvider } from "./context/customizeState.tsx";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <ThemeProvider>
    <CustomizeProvider>
      <App />
    </CustomizeProvider>
  </ThemeProvider>
);
