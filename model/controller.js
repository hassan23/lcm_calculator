const LCM = require("./model");

exports.save = (req, res) => {
  const LCMObj = {
    username: req.body.username,
    numbers: req.body.numbers,
    algo: req.body.algo,
    complexity: req.body.complexity,
    email: req.body.email,
    time: req.body.time,
    lcm: req.body.lcm
  };
  LCM.create(LCMObj)
    .then(() => {
      console.log("LCM saved");
      res.send({ message: "success", status: 201 });
    })
    .catch(e => console.log("error", e));
};

exports.fetchAll = (req, res) => {
  LCM.find({ email: req.query.email })
    .sort({ time: -1 })
    .then(response => {
      res.send(response);
    })
    .catch(e => console.log("error", e));
};
