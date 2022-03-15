const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
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

/* possible values for the gender field */
const genderEnum = Object.freeze({
  male: "male",
  female: "female",
  others: "others",
});

/* validation rules */
const rules = [
  check("name")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Name is required")
    .isLength({ min: 5 })
    .withMessage("Name must be of at least 5 characters long")
    .escape(),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .escape(),
  check("phoneNumber")
    .exists({ checkFalsy: true })
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number must be numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be of 10 numbers long")
    .escape(),
  check("gender")
    .exists({ checkFalsy: true })
    .withMessage("Gender is required")
    .custom((value) => !!genderEnum[value])
    .withMessage("Gender must be female, male or others")
    .escape(),
  check("hobbies")
    .exists({ checkNull: true })
    .withMessage("Hobbies are required"),
  check("hobbies.*")
    .isString()
    .withMessage("Hobbies must be of string datatype"),
];

/* post route to validate and store client inputs */
router.post("/form", [...rules], (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.json({ error: error.array() });
    return;
  }
  res.send(req.body);
});
module.exports = router;
