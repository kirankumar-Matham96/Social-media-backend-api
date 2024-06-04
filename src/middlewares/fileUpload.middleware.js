/**
 * This module will handle the file uploads
 */

// package imports
import multer from "multer";
import path from "path";

// folder path for storing the images
const folderPath = path.join(path.resolve(), "src", "media");

// multer config
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now().toString()}_${file.originalname}`;
    cb(null, fileName);
  },
});

// exporting multer instance
export const upload = multer({ storage: multerDiskStorage });
