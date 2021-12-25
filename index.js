const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;
const app = require("./app");
const db = require("./config/mongoose");

app.listen(port, () => console.log("server is running at port", port));
