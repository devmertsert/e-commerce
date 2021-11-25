import { Response, Request, NextFunction } from "express";
import { param, body, validationResult } from "express-validator";
import User from "../models/user.model";

import { Types } from "mongoose";
const { ObjectId } = Types;

/**
 * @description Validation rules for the auth routes.
 */
export const userValidations = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .bail()
      .custom((val) => {
        return User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject("This email address is already in use.");
          }
        });
      }),
    // password must be at least 8 chars long
    body("password").isLength({ min: 8 }),
  ];
};

/**
 * @description Validation rules for the products.
 *
 * @param {string} method Method. ie: create, update, delete, get
 */
export const productValidations = (method: string) => {
  let bodies = [
    body("name")
      .isString().bail()
      .notEmpty()
      .withMessage("Product name can't be emtpy."),
    body("description")
      .isString().bail()
      .isLength({ min: 10 }).bail(),
    body("carModel")
      .notEmpty()
      .custom((val) => ObjectId.isValid(val)),
    body("price")
      .isFloat({ min: 0 }).bail()
      .notEmpty()
      .withMessage("Product price can't be empty"),
    body("offPrice")
      .optional({ nullable: true })
      .isFloat({ min: 0 }).bail()
      .custom((val, { req }) => val > 0 && val <= parseInt(req.body.price))
      .withMessage("offPrice must be equal or less than price"),
    body("slug")
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional({ nullable: true })
      .withMessage("Please enter a valid slug."),
    body("quantity")
      .isInt({min: 0}).bail(),
    body("active")
      .custom(val => [0,1].includes(val))
      .withMessage("Please enter a valid value"),
    body("specificDetails")
      .optional({ nullable: true }),
    body("photos")
      .optional({ nullable: true }),
    body("thumbnail")
      .notEmpty().bail()
      .isString().bail()
      // .custom((val) => val.toString().length > 28)
      .withMessage("Please enter a valid thumbnail"),

  ];

  let params = [
    param("id").custom((val) => ObjectId.isValid(val)),
  ];

  if (method == "create") {
    return bodies;
  } else if (method == "update") {
    return [...bodies, ...params];
  } else if (method == "get" || method == "delete") {
    return params;
  } else {
    return [];
  }
};

/**
 * @description Validation rules for the car brands.
 *
 * @param {string} method Method. ie: create, update, delete, get
 */
export const brandValidations = (method: string) => {
  let bodies = [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("You must provide a name for the brand")
      .bail(),
    body("slug")
      .optional({ nullable: true})
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage("Please enter a valid slug.")
  ];

  let params = [
    param("id")
      .custom((val) => ObjectId.isValid(val))
      .withMessage("Please enter a valid id."),
  ];

  if (method == "create") {
    return bodies;
  } else if (method == "update") {
    return [...bodies, ...params];
  } else if (method == "get" || method == "delete") {
    return params;
  } else {
    return [];
  }
};

/**
 * @description Validation rules for the orders.
 *
 * @param {string} method Method. ie: create, update, delete, get
 */
export const orderValidations = (method: string) => {
  let bodies = [
    body("status")
      .optional()
      .isString(),
    body("orderTrackNo")
      .optional()
      .isString(),
  ];

  let params = [
    param("id")
      .custom((val) => ObjectId.isValid(val))
      .withMessage("Please enter a valid id."),
  ];

  if (method == "get") {
    return params;
  } else if (method == "update") {
    return [...bodies, ...params];
  } else {
    return [];
  }
};

/**
 * @description Validation rules for the car models.
 *
 * @param {string} method Method. ie: create, update, delete, get
 */
export const modelValidations = (method: string) => {
  let bodies = [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("You must provide a name for the model")
      .bail(),
    body("slug")
      .optional({ nullable: true})
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage("Please enter a valid slug."),
    body("brand")
      .notEmpty().bail()
      .custom((val) => ObjectId.isValid(val))
      .withMessage("Please enter a valid id."),
  ];

  let params = [
    param("id")
      .custom((val) => ObjectId.isValid(val))
      .withMessage("Please enter a valid id."),
  ];

  if (method == "create") {
    return bodies;
  } else if (method == "update") {
    return [...bodies, ...params];
  } else if (method == "get" || method == "delete") {
    return params;
  } else {
    return [];
  }
};

/**
 * @description Validation rules for the orders.
 *
 * @param {string} method Method. ie: create, update, delete, get
 */
export const paypalValidations = (method: string) => {
  let bodies = [
    body("paypal_client_id")
      .notEmpty()
      .withMessage("You must provide a paypal_client_id for the model")
      .bail()
      .isString(),
    body("paypal_secret_key")
      .notEmpty()
      .withMessage("You must provide a paypal_secret_key for the model")
      .bail()
      .isString(),
    body("payee_email_address")
      .notEmpty()
      .withMessage("You must provide a payee_email_address for the model")
      .bail()
      .isString(),
    body("payee_merchant_id")
      .notEmpty()
      .withMessage("You must provide a payee_merchant_id for the model")
      .bail()
      .isString(),
    body("description")
      .notEmpty()
      .withMessage("You must provide a description for the model")
      .bail()
      .isString(),
    body("tax")
      .notEmpty()
      .withMessage("You must provide a tax for the model")
      .bail()
      .isNumeric(),
  ];

  if (method == "create") {
    return [...bodies];
  } else if (method == "update") {
    return [...bodies];
  } else {
    return [];
  }
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: object[] = [];
  errors.array().map((err) =>
    extractedErrors.push({
      key: err.param,
      value: err.msg == "Invalid value" ? `Please enter a valid ${err.param}` : err.msg,
    })
  );

  return res.status(422).json({
    code: 422,
    message: "Please fix these errors in order to continue.",
    status: "error",
    errors: extractedErrors,
  });
};
