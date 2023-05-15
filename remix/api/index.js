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

  const User = sequelize.define(
    "User",
    {
      userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: Sequelize.STRING,
      timesWon: Sequelize.INTEGER,
    },
    {
      timestamps: false,
    }
  );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const bestUsers = await User.findAll({
    order: [["timesWon", "DESC"]],
    limit: 10,
    attributes: ["userName", "timesWon"],
  });

  let users = [];

  bestUsers.forEach((user) => {
    users.push(user.dataValues.userName);
  });
  res.status(200).json(users);
 });

app.post("/addUser", async (req, res) => {
  const reqUserName = req.body.userName;
  if(!reqUserName) {
    res.status(400).json({message: "User name is required"});
    return;
  }

  const doesUserExist = await User.findOne({
    where: { userName: reqUserName },
  });

  try {
    if (!doesUserExist) {
      await User.create({
        userName: req.body.userName,
        timesWon: 1,
      });
      res.status(200).json({message: "User added successfully"});
    } else {
      const userID = doesUserExist._previousDataValues.userID;
      await User.update(
        { timesWon: doesUserExist.timesWon + 1 },
        { where: { userID: userID } }
      );
      res.status(204).json({message: "User updated successfully"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port localhost:${process.env.PORT}!`)
);
