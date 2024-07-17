import { createAccount } from "./API";
import { useNavigate } from "react-router-dom";

function RegisterForm({
  newUser,
  setNewUser,
  newUserError,
  setNewUserError,
  currency,
  setCurrency,
  description,
  setDescription,
  balance,
  setBalance,
  onUserChange,
}) {
  const navigate = useNavigate();

  const register = async (form) => {

    const newAccountData = {
      user: form.user.value,
      currency: form.currency.value,
      description: form.description.value,
      balance: form.balance.value,
    };

    const data = JSON.stringify(newAccountData);

    const response = await createAccount(data);

    if (response.error) {
      setNewUserError(response.error);
    } else {
      setNewUserError("");
      onUserChange(response);
      navigate("/dashboard");
    }
  };

  return (
    <div className="RegisterForm">
      <h2>Register</h2>
      <form
        id="registerForm"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="user">
          Username <span>(required)</span>:
        </label>
        <input
          className="inputBox"
          id="user"
          value={newUser}
          placeholder="Enter your user name"
          onChange={(e) => {
            setNewUserError("");
            setNewUser(e.target.value);
          }}
          maxLength={20}
          required
        />
        <label htmlFor="currency">
          Currency <span>(required)</span>:
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="$">USD ($)</option>
          <option value="€">EUR (&euro;)</option>
          <option value="₴">UAH (&#8372;)</option>
        </select>
        <label htmlFor="description">Description:</label>
        <input
          className="inputBox"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
        />
        <label htmlFor="balance">Current balance:</label>
        <input
          className="inputBox"
          id="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <div className="errorMessage">{newUserError}</div>
        <div className="button">
          <button
            type="submit"
            onClick={(e) => {
              register(e.target.form);
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
