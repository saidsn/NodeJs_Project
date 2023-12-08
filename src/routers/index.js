const router = require("express").Router();
const upload = require("../middlewares/lib/upload");
const ApiError = require("../utils/errors");
const Response = require("../utils/response");
const auth = require("./auth.routes");

router.use(auth);

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      throw new ApiError("Error uploading", err);
    } else {
      return new Response(
        req.savedImages,
        "Image successfully uploaded"
      ).success(res);
    }
  });
});

module.exports = router;
