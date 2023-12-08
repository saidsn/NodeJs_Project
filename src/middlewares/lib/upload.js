const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype))
    callback("Please enter valid iamge file type !", false);
  callback(null, true);
};

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        const rootDir = path.dirname(require.main.filename)

        console.log(require.main.filename);

        fs.mkdirSync(path.join(rootDir, "/public/uploads"), { recursive: true });

        callback(null, path.join(rootDir,"public/uploads"))
    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split('/')[1];

        if (!req.savedImages) req.savedImages = [];

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        let url = `image_${uniqueSuffix}.${extension}`;

        req.savedImages = [...req.savedImages, path.join(url)];

        callback(null, url)
    }
})

const upload = multer({ storage, fileFilter }).array("images");
module.exports = upload;
