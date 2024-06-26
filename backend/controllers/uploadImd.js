const multer = require("multer");

// ЗАГРУЗКА КАРТИНОК
const storage = multer.diskStorage({
  destination: (_, __, cd) => {
    cd(null, "uploads");
  },
  filename: (_, file, cd) => {
    cd(null, file.originalname);
  },
});

module.exports.upload = multer({ storage });
