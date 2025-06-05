import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, ReactElement } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AxiosError } from "axios";

export const EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w+])+\.([a-z]){2,4}$/i;
export const PASSWORD_REGEX: RegExp = /\w{8,20}/;

const REGISTER_URL = "/register";

function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  // const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  // const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>("");
  const [validMatchPassword, setValidMatchPassword] = useState<boolean>(false);
  // const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match: boolean = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setError("");
  }, [email, password, matchPassword]);

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setBirthday("");
      navigate("/myaccount");
    }
  }, [success, navigate]);

  const onFirstnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };
  const onLastnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };
  const onBirthdayChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(new Date(e.target.value).toISOString()); //
  };
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLowerCase());
  };
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onMatchPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchPassword(e.target.value);
  };

  const emailValidationIcon: ReactElement | ReactElement[] = (
    <>
      {!email ? null : validEmail ? (
        <FontAwesomeIcon icon={faCheck} className="text-green-600" />
      ) : (
        <FontAwesomeIcon icon={faTimes} className="text-red-600" />
      )}
    </>
  );

  const passwordlValidationIcon: ReactElement = (
    <>
      {!password ? null : validPassword ? (
        <FontAwesomeIcon icon={faCheck} className="text-green-600" />
      ) : (
        <FontAwesomeIcon icon={faTimes} className="text-red-600" />
      )}
    </>
  );

  const matchPasswordlValidationIcon: ReactElement = (
    <>
      {!matchPassword ? null : validPassword === validMatchPassword ? (
        <FontAwesomeIcon icon={faCheck} className="text-green-600" />
      ) : (
        <FontAwesomeIcon icon={faTimes} className="text-red-600" />
      )}
    </>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !EMAIL_REGEX.test(email) ||
      !PASSWORD_REGEX.test(password) ||
      !firstname ||
      !lastname
    ) {
      setError("Invalid input data");
      return;
    }
    try {
      await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({ email, password, firstname, lastname, birthday })
      );
      setSuccess(true);
      //clear input fields
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err?.response) {
          setError("No server response.");
        } else if (err.response?.status === 409) {
          setError("User with provided email taken");
        } else {
          setError("Registration failed.");
        }
        errorRef.current?.focus();
      }
    }
  };

  return (
    <>
      <section className="m-auto flex flex-col flex-grow max-w-[860px] min-w-[330px]">
        <form className="mt-8 flex flex-col w-full" onSubmit={handleSubmit}>
          <h2 className="mb-2 text-center text-teal-700 text-2xl font-medium">
            New user
          </h2>
          <label htmlFor="firstname" className="text-xl">
            First name:
          </label>
          <input
            ref={nameRef}
            className="mb-5 p-1 w-11/12 border-2 rounded-md hover:shadow-md"
            id="firstname"
            name="firstname"
            type="text"
            autoComplete="off"
            required
            placeholder="Type your first name"
            maxLength={25}
            onChange={onFirstnameChanged}
          ></input>
          <label htmlFor="lastname" className="text-xl">
            Last name:
          </label>
          <input
            className="mb-5 p-1 w-11/12 border-2 rounded-md hover:shadow-md"
            id="lastname"
            name="lastname"
            type="text"
            autoComplete="off"
            required
            placeholder="Type your last name"
            maxLength={30}
            onChange={onLastnameChanged}
          ></input>
          <label htmlFor="birthday" className="text-xl">
            Date of birth:
          </label>
          <input
            className="mb-5 p-1 w-11/12 border-2 rounded-md hover:shadow-md"
            id="birthday"
            name="birthday"
            type="date"
            placeholder="Type your date of birth"
            onChange={onBirthdayChanged}
          ></input>
          <label htmlFor="email" className="text-xl">
            E-mail:
          </label>
          <div className="w-full">
            <input
              className="mb-5 p-1 w-11/12 border-2 rounded-md hover:shadow-md"
              // ref={emailRef}
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              required
              onChange={onEmailChanged}
              aria-invalid={validEmail ? "false" : "true"}
              // onFocus={() => setEmailFocus(true)}
              // onBlur={() => setEmailFocus(false)}
              placeholder="Type your e-mail"
              maxLength={25}
            ></input>
            <span className="pl-1">{emailValidationIcon}</span>
          </div>
          <label htmlFor="password" className="text-xl">
            Password:{" "}
            <span className="text-sm text-gray-400">
              <FontAwesomeIcon icon={faInfoCircle} /> At least 8 symbols.
            </span>
          </label>
          <div className="w-full">
            <input
              className="mb-5 p-1 w-11/12 border-2 rounded-md hover:shadow-md"
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              required
              onChange={onPasswordChanged}
              aria-invalid={validPassword ? "false" : "true"}
              // onFocus={() => setPasswordFocus(true)}
              // onBlur={() => setPasswordFocus(false)}
              placeholder="Type password"
            ></input>
            <span className="pl-1">{passwordlValidationIcon}</span>
          </div>
          <label htmlFor="confirmedPassword" className="text-xl">
            Confirm password:
          </label>
          <div className="w-full">
            <input
              className="mb-5 p-1 w-11/12 border-2 rounded-md hover:shadow-md"
              id="confirmedPassword"
              name="confirmedPassword"
              type="password"
              autoComplete="off"
              placeholder="Type password again"
              required
              onChange={onMatchPasswordChanged}
              aria-invalid={validMatchPassword ? "false" : "true"}
              // onFocus={() => setMatchPasswordFocus(true)}
              // onBlur={() => setMatchPasswordFocus(false)}
            ></input>
            <span className="pl-1">{matchPasswordlValidationIcon}</span>
          </div>
          {/* </div> */}
          <p
            ref={errorRef}
            className={error ? "text-red-600 text-sm" : "hidden"}
          >
            {error}
          </p>
          <button className="my-2 p-1.5 w-11/12 bg-[#2c2e3d] text-white rounded-md active:bg-teal-800">
            Register
          </button>
        </form>
        <p className="mx-4 text-center text-lg">
          Have you an account?{" "}
          <Link to="/login" className="text-lg underline text-teal-800">
            Login
          </Link>
        </p>
      </section>
    </>
  );
}
export default Register;
