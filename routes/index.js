var express = require("express");
var controller = require("../model/controller");

const router = express.Router();

router.get("/", function(req, res, next) {
  console.log("I reach here");
  res.json({ title: "Express" });
});
router.post("/save", controller.save);
router.get("/get", controller.fetchAll);
module.exports = router;
