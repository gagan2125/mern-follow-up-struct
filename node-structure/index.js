const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

app.use("/api/users", userRoute);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully!");
    sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect", err);
  });
