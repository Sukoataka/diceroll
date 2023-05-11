require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    stricterCallChecks: true,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/addUser", async (req, res) => {
  const User = sequelize.define("User", {
    userID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    userName: Sequelize.STRING,
    timesWon: Sequelize.INTEGER,
  }, {
    timestamps: false
  });

  const doesUserExist = await User.findOne({ where: { userName: req.body.userName } });

  //TODO: Fix this!!!!
  if(!doesUserExist) {
    await User.create({
        userName: req.body.userName,
        timesWon: 1
      });
  } else {
    // update user
  }

  res.status(200).send("User added successfully");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port localhost:${process.env.PORT}!`)
);
