import "./index.css";
import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AxiosProvider } from "./context/AxiosContext.tsx";
import { Toaster } from "react-hot-toast";
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
