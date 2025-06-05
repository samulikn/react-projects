import AccountInfoForm from "./AccountInfoForm";
import AccountOrders from "./AccountOrders";
import useAuth from "../hooks/useAuth";

const MyAccount = () => {
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
