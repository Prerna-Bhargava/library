const {
  users, category,
} = require("../database/Models");

const { v4: uuidv4 } = require("uuid");

const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const {
  RESPONSE_STATUS,
  SUCCESS_RESPONSE,
  FAILED_RESPONSE,
  ErrorCodeDescriptionRegex,
  OK_STATUS_FOR_CONTROLLER_DATA,
} = require("../Constants");
const { json } = require("body-parser");
const dayjs = require("dayjs");
const {
  inputFormatter,
  TYPE_OF_INPUT_CLEANER,
} = require("../Utlilities/Utilities");
const {
  pushControllerDataIntoDatabase,
} = require("./ControllerReusbaleFunctions");

exports.login = async (req, res) => {

  const { username, password } = req.body;

  console.log("username is ", username)
  try {
    console.log("hello listening")
    let user = await users.findAll({
      where: {
        username: username,
      },
    });
    console.log(user)
    console.log(password)
    if (!user || user[0].password !== password) {
      res.json({
        data: "Wrong Username or Password",
      });
    } else {
      res.json({
        data: user,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

exports.category = async (req, res) => {


  try {
    let user = await category.findAll({});

    res.json({
      data: user,
    });

  } catch (error) {
    res.json({
      error: error,
    });
  }
};