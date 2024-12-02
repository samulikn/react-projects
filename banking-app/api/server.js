const express = require("express");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');

// App constants
const port = process.env.PORT || 5000;
const apiPrefix = '/api';

// Create the Express app & setup middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
// ***************************************************************************

//Routes
// ----------------------------------------------
// Get server infos
app.use(`${apiPrefix}`, require("./routes/root"));
// Accounts operations
app.use(`${apiPrefix}/accounts`, require("./routes/root"));

// ***************************************************************************
// not configured
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
