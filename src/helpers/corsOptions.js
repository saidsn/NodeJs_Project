const whiteList = ["http://localhost:3000"];

const corsOptions = (req, callback) => {
  let options;
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    options = { origin: true };
  } else {
    options = { origin: false };
  }

  callback(null, options);
};

module.exports = corsOptions;
