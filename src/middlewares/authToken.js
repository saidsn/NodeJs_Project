const jwt = require("jsonwebtoken");
const ApiError = require("../utils/errors");
const user = require("../models/user.model");

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return res.status(201).json({
    success: true,
    token,
    message: "Token created successfully",
  });
};

const checkToken = async (req, res, next) => {
  const headerToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");

  if (!headerToken)
    throw new ApiError("Invalid authorization Please Login", 401);

  const token = req.headers.authorization.split(" ")[1];

  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) throw new ApiError("Invalid Token", 401);

    const userInfo = await user
      .findById(decoded.sub)
      .select("_id name lastname email");

    if (!userInfo) throw new ApiError("Invalid User", 401);

    req.user = userInfo;

    next();
  });
};

module.exports = {
  createToken,
  checkToken,
};
