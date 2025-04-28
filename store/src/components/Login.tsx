import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLocaleLowerCase());
  };
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      navigate("/myaccount");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err?.response) {
          setError("No server response");
        } else if (err.response?.status === 400) {
          setError("Missing email or password information.");
        } else if (err.response?.status === 401) {
          setError("Unauthorized");
        } else {
          setError("Login failed.");
        }
      }
      errorRef.current?.focus();
    }
  };

  return (
    <section className="m-auto flex flex-col flex-grow max-w-[800px]">
      <form className="mt-8 flex flex-col w-full" onSubmit={handleLogin}>
        <h2 className="mb-2 text-center text-teal-700 text-2xl font-medium">
          Login
        </h2>
        <label htmlFor="username" className="text-xl">
          E-mail:
        </label>
        <input
          ref={emailRef}
          className="mb-5 p-1 w-full border-2 rounded-md hover:shadow-md"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          placeholder="Type your e-mail"
          maxLength={25}
          value={email}
          onChange={onEmailChanged}
          required
        ></input>
        <label htmlFor="password" className="text-xl">
          Password:
        </label>
        <input
          className="mb-5 p-1 w-full border-2 rounded-md hover:shadow-md"
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          placeholder="Type password"
          value={password}
          onChange={onPasswordChanged}
          required
        ></input>
        <p ref={errorRef} className={error ? "text-red-600 text-lg" : "hidden"}>
          {error}
        </p>
        <button className="my-2 p-1.5 w-full bg-[#2c2e3d] text-white rounded-md hover:bg-teal-800">
          Login
        </button>
      </form>
      <p className="mx-4 text-center text-lg">
        Doesn't have account?{" "}
        <Link to="/register" className="text-lg underline text-teal-800">
          Register
        </Link>
      </p>
    </section>
  );
}

export default Login;
