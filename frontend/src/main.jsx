import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BookProvider } from "./context/bookContext.jsx";
import {NextUIProvider} from "@nextui-org/system";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>
);
