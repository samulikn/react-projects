const crypto = require("crypto");
const usersDB = {
  users: require("../model/db.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// store new user
const handleNewUser = (req, res) => {
  let { user, currency, description, balance } = req.body;

  // Check mandatory request parameters
  if (!user || !currency) {
    return res.status(400).json({
      error:
        "Missing parameters. Username and currency are required parameters!",
    });
  }

  // Check for duplicates
  const duplicate = usersDB.users.find(
    (userdb) => userdb.user === user.toString()
  );
  if (duplicate) {
    return res.status(409).json({ error: `User ${user} already exists.` });
  }

  // Convert balance to number if needed
  if (balance && typeof balance !== "number") {
    balance = parseFloat(balance);
    
    if (isNaN(balance)) {
      return res.status(400).json({ error: "Balance must be a number" });
    }
  }

  try {
    // Create account
    const newUser = {
      user: user,
      currency: currency,
      description: description || `${user}'s budget`,
      balance: balance || 0,
      transactions: [],
      limitAmount: 100,
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get User
const handleLogin = (req, res) => {
  const username = req.params.user;

  if (!username)
    return res.status(400).json({ error: "Username is required!" });

  const userData = usersDB.users.find(
    (userdb) => userdb.user === username.toString()
  );

  if (!userData)
    return res.status(404).json({ error: `User ${username} does not exist.` });

  return res.status(200).json(userData);
};

// remove specified user
const deleteUser = (req, res) => {
  const username = req.params.user;

  const removeUser = usersDB.users.find(
    (userdb) => userdb.user === username.toString()
  );

  if (!removeUser)
    return res.status(404).json({ error: `User ${username} not found.` });

  const filteredUsers = usersDB.users.filter(
    (userdb) => userdb.user !== username.toString()
  );
  usersDB.setUsers([...filteredUsers]);
  res.status(204).json({ suceess: `User ${username} deleted.` });
};

// update account data - modify limit value
const updateUserData = (req, res) => {
  const username = req.params.user; 
  const newLimit = req.body.limitAmount;

  if (!newLimit) return res.status(400).json({ error: "Missing limit value." });

  // Convert limitAmount to number if needed
  if (newLimit && typeof newLimit !== "number") {
    newLimit = parseInt(newLimit);
    if (isNaN(newLimit))
      return res.status(400).json({ error: "limitAmount must be a number." });
  }

  // Check if limit is a positive value
  if (newLimit < 0)
    return res.status(400).json({ error: "Limit value must be a positive." });

  // Check if account already exists
  const userData = usersDB.users.find(
    (userdb) => userdb.user === username.toString()
  );
  if (!userData)
    return res.status(404).json({ error: `User ${username} doesn't exists.` });

  userData.limitAmount = newLimit;

  const filteredUsers = usersDB.users.filter(
    (userdb) => userdb.user !== username.toString()
  );

  usersDB.setUsers([...filteredUsers, userData]);

  return res
    .status(200)
    .json(userData);
};

// Store transaction
const addTransaction = (req, res) => {
  const username = req.params.user;
  let { date, object, amount } = req.body;

  // Check if account exists
  const userData = usersDB.users.find(
    (userdb) => userdb.user == username.toString()
  );
  if (!userData)
    return res.status(404).json({ error: `User ${username} not found.` });

  // Check mandatory requests parameters
  if (!date || !object || !amount)
    return res
      .status(400)
      .json({ error: "Transaction date, object and amount are required." });

  // Convert amount to number if needed
  if (amount && typeof amount !== "number") amount = parseFloat(amount);

  // Check that amount is a valid number
  if (amount && isNaN(amount))
    return res.status(400).json({ error: "Amount must be a number" });

  // Check the amount of transaction if it doesn't exceed the limit
  if (amount < 0 && Math.abs(amount) > userData.limitAmount)
    return res.status(400).json({ error: "Amount exceeded the limit" });

  // Check if you have enough money on your balance
  if (amount < 0 && userData.balance + amount < 0)
    return res
      .status(400)
      .json({ error: "You do not have enough money on your account" });

  // Generates an ID for the transaction
  try {
    const id = crypto
      .createHash("md5")
      .update(date + object + amount)
      .digest("hex");

    // Check that transaction does not already exist
    if (userData.transactions.some((transaction) => transaction.id === id))
      return res.status(409).json({ error: "Transaction already exists" });

    // Add transaction
    const transaction = {
      id,
      date,
      object,
      amount,
    };

    userData.transactions.push(transaction);

    // Update balance
    userData.balance += transaction.amount;

    const filteredUsers = usersDB.users.filter(
      (userdb) => userdb.user !== username.toString()
    );

    usersDB.setUsers([...filteredUsers, userData]);
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove specified transaction from account
const deleteTransaction = (req, res) => {
  const username = req.params.user;
  const transactionId = req.params.id;

  //check if account exists
  const userData = usersDB.users.find(
    (userdb) => userdb.user === username.toString()
  );
  if (!userData)
    res.status(404).json({ error: `User ${username} does not exist` });

  const transactionIndex = userData.transactions.findIndex(
    (transaction) => transaction.id === transactionId
  );
  if (transactionIndex === -1)
    res.status(404).json({ error: "Transaction does not exist" });

  try {
    //delete transaction
    userData.transactions.splice(transactionIndex, 1);
    const filteredData = usersDB.users.filter(
      (userdb) => userdb.user !== username.toString()
    );
    usersDB.setUsers([...filteredData, userData]);
    res.status(204).json({ success: "Transaction was deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  handleNewUser,
  handleLogin,
  deleteUser,
  updateUserData,
  addTransaction,
  deleteTransaction,
};
