const { body } = require("express-validator");

exports.validateCreateTenant = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("mobileNo").isNumeric().withMessage("Mobile number must be numeric"),
    body("type")
      .isIn(["Student", "Working Professional"])
      .withMessage("Invalid tenant type"),
    body("hostelId").notEmpty().withMessage("Hostel ID is required"),
    body("roomId").notEmpty().withMessage("Room ID is required"),
    body("emergencyContactNumber")
      .isNumeric()
      .withMessage("Emergency contact number must be numeric"),
    body("adhaarNumber")
      .isLength({ min: 12, max: 12 })
      .withMessage("Adhaar number must be 12 characters long"),
    body("permanentAddress.state")
      .notEmpty()
      .withMessage("Permanent address state is required"),
    body("permanentAddress.district")
      .notEmpty()
      .withMessage("Permanent address district is required"),
    body("permanentAddress.pincode")
      .isNumeric()
      .withMessage("Permanent address pincode must be numeric"),
    body("temporaryAddress.state")
      .notEmpty()
      .withMessage("Temporary address state is required"),
    body("temporaryAddress.district")
      .notEmpty()
      .withMessage("Temporary address district is required"),
    body("temporaryAddress.pincode")
      .isNumeric()
      .withMessage("Temporary address pincode must be numeric"),
    body("rentType")
      .isIn(["monthly", "weekly"])
      .withMessage("Invalid rent type"),
    body("rentedDate").isISO8601().withMessage("Invalid rented date format"),
  ];
};
