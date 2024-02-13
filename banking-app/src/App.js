import { useState } from "react";
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

export default function App () {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();
  const storageKey = 'savedAccount';

  const handleDataChange = (accountData) => {
    setAccount(accountData);
    localStorage.setItem(storageKey,JSON.stringify(accountData));
    navigate("/");
  };

  const redirect = account ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;

  return (
    <>
      <Routes>
        <Route path="/" element={redirect}/>
        <Route path="/login" element={<Login onUserChange={handleDataChange}/>}/>
        <Route path="/dashboard" element={<Dashboard accountData={account} updateAccount={handleDataChange}/>}/>
      </Routes>
    </>
  );
};

