var express = require("express");
var controller = require("../model/controller");

const router = express.Router();

router.post("/save", controller.save);
router.get("/get", controller.fetchAll);
module.exports = router;
