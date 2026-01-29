import multer from "multer";
import path from "path";
import crypto from "crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(6).toString("hex");
    cb(null, `${hash}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
