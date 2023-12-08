const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/authToken");


const login = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await user.findOne({ email });

  if (!findUser) throw new ApiError("Email or password wrong", 401);

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) throw new ApiError("Email or password wrong", 401);

  createToken(findUser, res);
};

const register = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  const checkUser = await user.findOne({ email });

  if (checkUser) throw new ApiError("User already registered", 401);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    name,
    lastname,
    email,
    password: hashedPassword,
  });

  await newUser
    .save()
    .then((response) => {
      return new Response(response, "Created successfully").created(res);
    })
    .catch((err) => {
      throw new ApiError("Could not create", 400);
    });
};

const me = async (req, res) => {
  return new Response(req.user).success(res)
}

module.exports = {
  login,
  register,
  me
};
