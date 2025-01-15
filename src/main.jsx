import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PostContext from "./context/postContext.jsx";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PostContext>
      <App />
      <ToastContainer/>
    </PostContext>
  </BrowserRouter>
);
