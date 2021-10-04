const Multer = require("multer");

const uploadSingleImage = Multer({
  storage: Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/uploads");
    },
    filename: function (req, file, cb) {
      const fileName = req.params.id + ".jpeg";
      cb(null, fileName);
    },
    fileFilter: (req, file, callback) => {
      let allowedTypes = ["image/jpeg"];

      if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error("Tipo do arquivo inválido"));
      }
    },
  }),
});

module.exports = uploadSingleImage.single("image");
