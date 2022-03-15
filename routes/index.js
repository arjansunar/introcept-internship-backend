var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Expresss" });
});

/* Get from route */
router.get("/form", (req, res, next) => {
  res.render("form", {
    title: "form",
  });
});
router.post("/form", (req, res, next) => {
  res.send(req.body);
});
module.exports = router;
