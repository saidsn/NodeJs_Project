require("express-async-errors");
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001;
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

//Middleware
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(__dirname))


// Node.js'de "CORS," Cross-Origin Resource Sharing'ın kısaltmasıdır.
// Bu, tarayıcıların başka bir alanın kaynaklarına erişimi denetlemek için uyguladığı bir güvenlik özelliğidir.
app.use(cors(corsOptions));

// Tehlikeli karakterleri bu karakterle değiştir
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use("/api", router);
app.use(errorHandlerMiddleware);

// Define a route for the root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Node Server!",
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
