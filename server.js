const express = require("express");
const app = express();
app.use(express.json());

const connectDb = require("./db/connection");


const addUser = require("./routes/addUser");
const editUser = require("./routes/editUser");
const deleteUser = require("./routes/deleteUser");
const viewUsers = require("./routes/viewUsers");


connectDb().catch(console.error);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/addUser", addUser);
app.use("/editUser", editUser);
app.use("/deleteUser", deleteUser);
app.use("/viewUsers", viewUsers);
