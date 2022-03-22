const { body } = require("express-validator");
const Appointment = require("../models/appointment");
const moment = require("moment");

const registerUserValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Not a valid name")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 character long"),

    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 10, max: 50 }),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),
    body("phone").isMobilePhone().withMessage("Enter a valid Phone Number"),
  ];
};

const loginUserValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 7, max: 50 }),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),
  ];
};

const categoryValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Invalid Category")
      .isLength({ min: 3, max: 30 }),
  ];
};

const editcategoryValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Invalid Category")
      .isLength({ min: 3, max: 30 }),
  ];
};

const appointmentValidation = () => {
  return [
    body("title").isString().withMessage("Not a valid title"),
    body("date").isDate().withMessage("Not a valid date"),
    body("user").isString().withMessage("Not a valid user"),
    body("beginsAt").exists().withMessage("beginsAt is required").custom((value, {req})=>{
      const currentDate = new Date();
      const date = req.body.date;

      const appointmentStart = moment(date + " " + value);
      req.appointmentStart = appointmentStart;
      if(currentDate < appointmentStart){
        return Promise.resolve()
      }else{
        return Promise.reject("Please select appropriate date and time for end of appointment")
      }
    }),
    body("endsAt").exists().withMessage("endsAt is required").custom((value, {req})=>{
      const currentDate = new Date();
      const date = req.body.date;

      const appointmentEnd = moment(date + " " + value);
      if(currentDate < appointmentEnd && appointmentEnd > req.appointmentStart){
        return Promise.resolve()
      }else{
        return Promise.reject("Please select appropriate date and time for end of appointment")
      }
    }),
    body("status").isString().withMessage("Not a valid status"),
  ];
};

function validateBeginsAt() {

  return [
    body("beginsAt").custom(async (value) => {
      console.log(value);
      const currentDate = new Date();
      if (value >= currentDate) {
        return Promise.resolve();
      } else {
        throw new Error("Date not Valid");
      }
    }),
  ];
}

const editAppointmentValidation = () => {
  return [
    body("title").optional().isString().withMessage("Not a valid title"),
    body("status").optional().isString().withMessage("Not a valid status"),
  ];
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  categoryValidation,
  editcategoryValidation,
  appointmentValidation,
  editAppointmentValidation,
  // validateBeginsAt,
};
