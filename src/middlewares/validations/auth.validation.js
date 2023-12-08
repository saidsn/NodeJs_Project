const joi = require("joi");
const ApiError = require("../../utils/errors");

class AuthValidation {
  constructor() { }
  
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().required().trim().min(3).max(100).messages({
            "string.base": "Name must be normal text !",
            "string.empty": "Name must't be empty",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be at most 100 characters",
            "string.required": "Name is required",
          }),
          lastname: joi.string().required().trim().min(3).max(100).messages({
            "string.base": "Lastname must be normal text !",
            "string.empty": "Lastname must't be empty",
            "string.min": "Lastname must be at least 3 characters",
            "string.max": "Lastname must be at most 100 characters",
            "string.required": "Lastname is required",
          }),
          email: joi
            .string()
            .email()
            .required()
            .trim()
            .min(3)
            .max(100)
            .messages({
              "string.base": "Email must be normal text !",
              "string.email": "Email must be a valid email address",
              "string.empty": "Email must't be empty",
              "string.min": "Email must be at least 3 characters",
              "string.max": "Email must be at most 100 characters",
              "string.required": "Email is required",
            }),
          password: joi.string().required().trim().min(6).max(36).messages({
            "string.base": "Password must be normal text !",
            "string.empty": "Password must't be empty",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be at most 36 characters",
            "string.required": "Password is required",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new ApiError(error.details[0].message, 400);
      } else {
        throw new ApiError("Please write walidation", 400);
      }
    }
    next();
  };

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .required()
            .email()
            .trim()
            .min(3)
            .max(100)
            .messages({
              "string.base": "Email must be normal text",
              "string.required": "Email is erquired",
              "string.email": "Email must be a valid email address",
              "string.empty": "Email mustn't be empty",
              "string.min": "Email must be at least 3 characters",
              "string.max": "Email must be at most 100 characters",
            }),
          password: joi.string().required().trim().min(3).max(36).messages({
            "string.base": "Password must be a valid password",
            "string.required": "Password is required",
            "string.empty": "Password must't be empty",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be at most 36 characters",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new ApiError(error.details[0].message, 400);
      } else {
        throw new ApiError("Please write validation", 400);
      }
    }
    next();
  };
  
}

module.exports = AuthValidation;
