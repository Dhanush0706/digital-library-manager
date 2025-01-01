const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;


//middleware
app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }))


mongoose.connect("mongodb://localhost:27017/digital-library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  
  // Initialize multer
  const upload = multer({
    storage,
    limits: { fileSize: 40 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /pdf/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      if (extName) {
        cb(null, true);
      } else {
        cb("Error: Only PDFs are allowed!");
      }
    },
  });
  
  const booksRouter = require("./routes/books")(upload);
  app.use("/books", booksRouter);
  
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));