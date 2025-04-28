import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, ReactElement, useEffect } from "react";
//import { UserDataType } from "./MyAccount";
import useAuth from "../hooks/useAuth";

// type AuthUserType = { user: string };

export type UserType = {
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
};

function AccountInfoForm(): ReactElement | ReactElement[] {
  const { auth } = useAuth();
  const user = auth.email;
  // console.log(user)

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [changes, setChanges] = useState<boolean>(false);

  useEffect(() => {
    //
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
      // console.log("user ifo from db:", user)
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      // setBirthday(user.birthday);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Update db");
    e.preventDefault();
    setChanges(false);
  };
  const onFirstnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };
  const onLastnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
    setChanges(true);
  };
  const onBirthdayChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const bdate = e.target.value ? new Date(e.target.value) : null;
    setBirthday(e.target.value);
    setChanges(true);
  };
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setChanges(true);
  };
  const logout = () => {};

  const content: ReactElement | ReactElement[] = (
    <>
      <div className="flex justify-between mx-6">
        <div>
          <h2 className="self-start mt-4 text-2xl text-teal-700">
            Welcome, {}
          </h2>
          <p className="mb-3">{auth.email}</p>
        </div>
        <i
          className="bi bi-box-arrow-right px-2 text-2xl self-center hover:cursor-pointer"
          onClick={logout}
        ></i>
      </div>
      <hr />
      <section>
        <form
          className="mt-4 flex flex-col gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl  text-teal-800">Account info</h3>
          <div className="flex flex-col w-full gap-4">
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
                  // required
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
                  required
                  onChange={onLastnameChanged}
                ></input>
              </label>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-12">
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
                >
                  {null}
                </input>
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
          <button
            className="mt-3 py-1 px-5 bg-[#2c2e3d] hover:bg-teal-800 text-white rounded-md"
            disabled={!changes ? true : false}
            //onClick={handleSubmit}
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
