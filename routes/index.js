var express = require("express");
var controller = require("../model/controller");

const router = express.Router();

router.post("/save", controller.save);
router.get("/get", controller.fetchAll);
router.get("/clienturl", (req, res) => {
  res.json({ url: process.env.CLIENT_URL });
});
module.exports = router;
