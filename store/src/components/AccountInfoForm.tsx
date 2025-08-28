import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AxiosError } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
};

const USER_URL = "/users/";
const EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w+])+\.([a-z]){2,4}$/i;

function AccountInfoForm(): ReactElement | ReactElement[] {
  const { auth } = useAuth();
  const user = auth.email;
  const name = auth.name;

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const logout = useLogout();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const response = await axiosPrivate.get<UserType>(
          USER_URL + encodeURIComponent(user)
        );
        return response?.data;
      } catch (err) {
        if (err instanceof AxiosError) console.log(err.message);
      }
    };
    fetchData().then((user) => {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setId(user._id);
      const birthday: string = user.birthday
        ? user.birthday.substring(0, user.birthday.indexOf("T"))
        : "";
      setBirthday(birthday);
    });
  }, [user]);

  useEffect(() => {
    setError("");
    setSuccess(false);
  }, [firstname, lastname, email, birthday]);

  const handleLogout = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const validEmail: boolean = EMAIL_REGEX.test(email);

    if (!id || !email || !firstname || !lastname || !validEmail) {
      setError("Invalid input data!");
      return;
    }

    try {
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
            Welcome, {name}
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
              !success ? (error ? "text-red-600" : "hidden") : "text-green-600"
            }
          >
            {error ? error : "Saved"}
          </p>
          <button
            className="py-1.5 px-14 border-solid border-2 rounded-xl bg-[#2c2e3d]
                       active:opacity-45 hover:bg-teal-800 text-xl text-white"
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
