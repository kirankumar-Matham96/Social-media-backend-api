import multer from "multer";
import path from "path";

const folderPath = path.join(path.resolve(), "src", "media");

const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now().toString()}_${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: multerDiskStorage });
