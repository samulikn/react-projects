import { getAccount } from "./API";
import { useNavigate } from "react-router-dom";
import "./App.css";

function LoginForm({ user, setUser, userError, setUserError, onUserChange }) {
  const navigate = useNavigate();

  const login = async (form) => {
    const user = form.user.value;

    try {
      const response = await getAccount(user);

      if (!response.error) {
        setUserError("");
        onUserChange(response);
        navigate("/dashboard");
      } else {
        setUserError(`Error: ${response.error}`);
      }
    } catch (err) {
      setUserError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="LoginForm">
      <h2>Login</h2>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="user">
          Username <span>(required)</span>:
        </label>
        <input
          className="inputBox"
          id="user"
          value={user}
          placeholder="Enter your user name"
          onChange={(e) => {
            setUser(e.target.value);
            setUserError("");
          }}
          maxLength={20}
          required
        />
        <div className="errorMessage">{userError}</div>
        <div className="button">
          <button
            type="submit"
            onClick={(e) => {
              login(e.target.form);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
