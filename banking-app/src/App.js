import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

export default function App() {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  const handleDataChange = (accountData) => {
    setAccount(accountData);
    navigate("/");
  };

  const redirect = account ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={redirect} />
        <Route
          path="/login"
          element={<Login onUserChange={handleDataChange} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard accountData={account} updateAccount={handleDataChange} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
