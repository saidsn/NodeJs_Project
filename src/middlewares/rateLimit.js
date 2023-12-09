const rateLimit = require("express-rate-limit");

const allowList = ["::1"];

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req, res) => {
    console.log("api url: " + req.url);
    if (req.url === "/login" || req.url === "/register") return 5;
    else return 100;
  },
  message: {
    success: false,
    message: "You have exceeded the request limit !",
  },
  // skip: (req, res) => allowList.includes(req.ip),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = apiLimiter;
