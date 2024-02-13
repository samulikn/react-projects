import { useState } from "react";
import logo from './wheat.png';
import './App.css';

import { getAccount, createAccount } from './API';

export default function Login({ onUserChange }) {
    const [user, setUser] = useState("");
    const [newUser, setNewUser] = useState("");
    const [userError, setUserError] = useState("");
    const [newUserError, setNewUserError] = useState("");
    const [description, setDescription] = useState("");
    const [balance, setBalance] = useState(0);
    const [currency, setCurrency] = useState("EUR");

    async function login(form) {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJson = Object.fromEntries(formData.entries());
        // const data = JSON.stringify(formJson);
        const user = formJson.user;
        const accountData = await getAccount(user);
    
        if (accountData.error) {
            setUserError(accountData.error);
        } else {
            onUserChange(accountData);
        }
    };

    async function register(form) {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJson = Object.fromEntries(formData.entries());
        const data = JSON.stringify(formJson);
    
        const accountData = await createAccount(data);
    
        if (accountData.error) {
            setNewUserError(accountData.error);
        } else {
            onUserChange(accountData);
        }
    };

    return (
        <div className="login">
            <div className="title-logo">
                <img src={ logo } alt="logo"/>
                <h1>Bank App</h1>
            </div>

            <div className="login-page-content">
                <section>
                    <h2>Login</h2>
                    <form autoComplete="off" onSubmit={login} >
                        <label htmlFor="username">Username <span>(required)</span>:</label>
                        <input 
                            className="inputBox"
                            id="username" 
                            name="user"
                            value={user}
                            placeholder="Enter your user name"
                            onChange={ e => {
                                if (userError) setUserError("");
                                setUser(e.target.value);} 
                            } 
                            maxLength={ 20 }
                            required />
                        <div className="errorMessage">{userError}</div>
                        <div className="button">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <hr />
                    <h2>Register</h2>
                    <form id="registerForm" autoComplete="off" onSubmit={register}>
                        <label htmlFor="userName">Username <span>(required)</span>:</label>
                        <input 
                            className="inputBox"
                            id="user" 
                            name="user"
                            value={newUser} 
                            placeholder="Enter your user name"
                            onChange={e => {
                                if (newUserError) setNewUserError("");
                                setNewUser(e.target.value);}
                            } 
                            maxLength={ 20 }
                            required />
                        <label htmlFor="currencyId">Currency <span>(required)</span>:</label>
                            <select 
                                id="currencyId"
                                name="currency"
                                value={ currency } 
                                onChange={e => setCurrency(e.target.value)}
                            >
                                <option value="$">USD ($)</option>
                                <option value="&euro;">EUR (&euro;)</option>
                                <option value="&#8372;">UAN (&#8372;)</option>
                            </select>
                        <label htmlFor="descriptionId">Description:</label>
                        <input className="inputBox"
                            id="descriptionId"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={ 100 }/>
                        <label htmlFor="balanceId">Current balance:</label>
                        <input className="inputBox"
                            id="balanceId"
                            name="balance"
                            type="number" 
                            value={balance}
                            onChange={e => setBalance(e.target.value)} />
                        <div className="errorMessage">{newUserError}</div>
                        <div className="button">
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}