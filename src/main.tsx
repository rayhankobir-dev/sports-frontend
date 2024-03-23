import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AxiosProvider } from "./context/AxiosContext.tsx";
import { VideoProvider } from "./context/VideoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AxiosProvider>
          <VideoProvider>
            <App />
            <Toaster />
          </VideoProvider>
        </AxiosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
