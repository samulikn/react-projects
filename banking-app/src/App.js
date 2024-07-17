import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Missing from "./Missing";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [account, setAccount] = useState("");

  const handleDataChange = (accountData) => {
    setAccount(accountData);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home accountData={account} updateAccount={handleDataChange} />
          }
        />
        <Route
          path="login"
          element={<Login onUserChange={handleDataChange} />}
        />
        <Route
          path="dashboard"
          element={
            <Dashboard accountData={account} updateAccount={handleDataChange} />
          }
        />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
