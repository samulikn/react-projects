import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios, { axiosPrivate } from "../api/axios";
import useOrders from "../hooks/useOrders";
import { AxiosError } from "axios";

export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
};

const LOGOUT_URL = "/auth/logout";
const USER_URL = "/users";
const EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w+])+\.([a-z]){2,4}$/i;

function AccountInfoForm(): ReactElement | ReactElement[] {
  const { auth, setAuth } = useAuth();
  const { setOrders } = useOrders();
  const user = auth.email;

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (): Promise<UserType> => {
      const data = await fetch(
        "http://localhost:5000/users/" + encodeURIComponent(user)
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchData().then((user) => {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setId(user._id);

      const birthday: string = user.birthday?.substring(
        0,
        user.birthday.indexOf("T")
      );
      setBirthday(birthday);
    });
  }, []);

  useEffect(() => {
    setError("")
    setSuccess(false)
  }, [firstname, lastname, email, birthday])

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      // const response =
      // check if logout is just for one user
      await axios.post(LOGOUT_URL, JSON.stringify({}), {
        headers: { "Content-type": "application/json" },
      });
      // console.log(JSON.stringify(response?.data));
      setAuth({ email: "", password: "", accessToken: "" });
      setOrders([]);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const validEmail: boolean = EMAIL_REGEX.test(email)

    if (!id || !email || !firstname || !lastname || !validEmail) {
      setError("Invalid input data!")
      return;
    }
    
    try {
      // const response = 
      await axiosPrivate.patch(
        USER_URL,
        JSON.stringify({ id, email, firstname, lastname, birthday })
      );
      setSuccess(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err?.response) {
          setError("No server response");
        } else if (err.response?.status === 406) {
          setError("Found no user.");
        } else if (err.response?.status === 409) {
          setError("User already exists with this email.");
        } else {
          setError("Failed to save.");
        }
      }
    }
  };

  const onFirstnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };
  const onLastnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };
  const onBirthdayChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const content: ReactElement | ReactElement[] = (
    <>
      <div className="flex justify-between mx-6">
        <div>
          <h2 className="self-start mt-4 text-2xl text-teal-700">
            Welcome, {firstname}
          </h2>
          <p className="mb-3">{auth.email}</p>
        </div>
        <i
          className="bi bi-box-arrow-right px-2 text-2xl self-center hover:cursor-grab"
          onClick={handleLogout}
        ></i>
      </div>
      <hr />
      <section>
        <form
          className="mt-4 flex flex-col gap-2 items-center"
          onSubmit={handleSave}
        >
          <h3 className="text-xl  text-teal-800">Account info</h3>
          <div className="flex flex-col w-full gap-4 text-xl">
            <div className="flex flex-wrap justify-center gap-3 md:gap-12">
              <label className="px-2 basis-72" htmlFor="firstname">
                First name:
                <input
                  className="p-1 w-full border-2 rounded-md hover:shadow-md"
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="off"
                  value={firstname}
                  onChange={onFirstnameChanged}
                ></input>
              </label>
              <label className="px-2 basis-72" htmlFor="lastname">
                Last name:
                <input
                  className="p-1 w-full border-2 rounded-md hover:shadow-md"
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="off"
                  value={lastname}
                  onChange={onLastnameChanged}
                ></input>
              </label>
            </div>
            <div className="mb-3 flex flex-wrap justify-center gap-3 md:gap-12">
              <label className="px-2 basis-72" htmlFor="birthday">
                Date of birth:
                <input
                  className="p-1 w-full border-2 rounded-md hover:shadow-md"
                  id="birthday"
                  name="birthday"
                  type="date"
                  autoComplete="off"
                  value={birthday}
                  onChange={onBirthdayChanged}
                ></input>
              </label>
              <label className="px-2 basis-72" htmlFor="email">
                E-mail:
                <input
                  className="p-1 w-full border-2 rounded-md hover:shadow-md"
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="off"
                  value={email}
                  required
                  onChange={onEmailChanged}
                ></input>
              </label>
            </div>
          </div>
          <p
            className={
              !success
                ? error
                  ? "text-red-600"
                  : "hidden"
                : "text-green-600"
            }
          >
            {error ? error : "Saved"}
          </p>
          <button
            className="py-1.5 px-10 border-solid border-2 rounded-2xl bg-[#2c2e3d]
                       hover:bg-teal-800 text-xl text-white"
          >
            Save
          </button>
        </form>
      </section>
    </>
  );

  return content;
}

export default AccountInfoForm;
