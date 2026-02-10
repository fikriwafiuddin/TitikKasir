import { ErrorResponse } from "@/utils/response.js"
import multer from "multer"

// Use memory storage for Vercel (stateless/read-only filesystem)
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(
      file.originalname.toLowerCase().split(".").pop() || "",
    )

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(
      new ErrorResponse(
        "Only images (jpeg, jpg, png, webp) are allowed",
        400,
      ) as any,
    )
  },
})

export default upload
