const route = require("express").Router();
const { Router } = require("express");
const controller = require("../Controller/ApiController");
const { controllerdata } = require("../database/Models");


route.post(
  "/login",
  controller.login
);

route.get(
  "/category",
  controller.category
);

module.exports = route;
