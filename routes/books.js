const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


module.exports = (upload) => {
  // Add a Book with File Upload
  router.post("/", upload.single("file"), async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);

      const { title, category } = req.body;
      const filePath = req.file ? `/uploads/${req.file.filename}` : null;

      if (!filePath) {
        console.error("File upload failed.");
        return res.status(400).json({ error: "File upload failed." });
      }

      const newBook = new Book({ title, category, fileUrl: filePath });
      await newBook.save();

      console.log("New book added:", newBook);
      res.status(201).json(newBook);
    } catch (error) {
      console.error("Error occurred:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Get All Books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get Books by Category
 router.get("/category/:category", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 });

  return router;
};





