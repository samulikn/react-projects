import { useState, useEffect } from "react";
// import logo from './wheat.png';
import "./App.css";
import Transaction from "./Transaction";
import Modal from "./Modal";

export default function Dashboard({ accountData, updateAccount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "My account";
  }, []);

  const logOut = () => {
    updateAccount("");
  };

  const handleClickOpen = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const onModalCloseRequest = () => {
    setIsModalOpen(false);
  };

  const refreshDashboard = (account) => {
    updateAccount(account);
  };

  return (
    <main className="DashboardPage">
      <div className="balance-details">
        <div className="account-details">
          Balance: <span>{accountData.balance.toFixed(2)}</span>
          <span>{accountData.currency}</span>
          <h2>{accountData.description}</h2>
        </div>
        <button className="logoutButton" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="account-transactions">
        <h2>Transactions</h2>
        <button onClick={handleClickOpen}>Add transaction</button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Object</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {accountData.transactions.map((i) => {
              return <Transaction key={i.id} transaction={i} />;
            })}
          </tbody>
        </table>
      </div>
      <Modal
        user={accountData.user}
        isOpen={isModalOpen}
        onCloseRequest={onModalCloseRequest}
        refreshData={refreshDashboard}
      />
    </main>
  );
}
