import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';

import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
);

