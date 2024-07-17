import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import "./App.css";

export default function Login({ onUserChange }) {
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [userError, setUserError] = useState("");
  const [newUserError, setNewUserError] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState("€");

  return (
    <main className="LoginPage">
      <div className="login-page-content">
        <section>
          <LoginForm
            user={user}
            setUser={setUser}
            userError={userError}
            setUserError={setUserError}
            onUserChange={onUserChange}
          />
          <RegisterForm
            newUser={newUser}
            setNewUser={setNewUser}
            newUserError={newUserError}
            setNewUserError={setNewUserError}
            currency={currency}
            setCurrency={setCurrency}
            description={description}
            setDescription={setDescription}
            balance={balance}
            setBalance={setBalance}
            onUserChange={onUserChange}
          />
        </section>
      </div>
    </main>
  );
}
