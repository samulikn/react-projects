// import { useParams } from "react-router-dom";
import AccountInfoForm from "./AccountInfoForm";
import AccountOrders from "./AccountOrders";
import useAuth from "../hooks/useAuth";

// export type UserDataType = {
//   user: {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string;
//     email: string;
//   };
// };


const MyAccount = () => {
  // const params = useParams();
  // console.log("params", params)

  const { auth } = useAuth();
  const authUser = auth.email;

  const content = !authUser ? (
    <p className="flex-grow m-4">Loading...</p>
  ) : (
    <main className="flex-grow">
      <AccountInfoForm />
      <AccountOrders />
    </main>
  );

  return content;
};

export default MyAccount;
