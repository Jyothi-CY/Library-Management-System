const express = require("express");
const router = express.Router();
const transactionModel = require("../models/transactionModel");
const requireAuth = require("../middleware/requireAuth");
const {BookModel} = require("../models/bookModel");
const UserModel = require("../models/userModel");

router.use(requireAuth);

router.get("/all", async (req, res) => {
  try {
    const transactions = await transactionModel.find();
    res.json(transactions);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.get("/warning", async (req, res) => {
  try {
    const transactions = await transactionModel.find();
    const today = new Date();
    const warning = transactions.filter((transaction) => {
      return (
        transaction.toDate < today && transaction.returnDate === null
      );
    });
    res.json(warning);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const transactions = await transactionModel.find({
      borrowerId: req.params.id,
    });
    res.json(transactions);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  const { bookId, borrowerId, fromDate, toDate } = req.body;
  console.table(req.body);
  try {
    const book = await BookModel.findById(bookId);
    console.log(book);
    if (book.available === "false") {
      return res.status(400).json({ message: "Book is not available" });
    }
    book.available = "false";
    await book.save();
    const transaction = new transactionModel({
      bookId,
      borrowerId,
      fromDate,
      toDate,
      borrowerUsername: req.user.username,
      bookTitle: book.title,
    });
    await transaction.save();
    console.log(transaction);
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message, message: "Error adding transaction"});
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const transaction = await transactionModel.findById(req.params.id);
    const book = await BookModel.findById(transaction
      .bookId);
    book.available = "true";
    await book.save();
    transaction.returnDate = new Date();
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(400).json({error: error.message, message: "Error updating transaction"});
  }
})

router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    throw Error("You are not authorized to do this action");
  }
  try {
    const transaction = await transactionModel.findByIdAndDelete(req.params.id);
    const book = await BookModel.findById(transaction
      .bookId);
    book.available = "true";
    await book.save();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(400).json({error: error.message, message: "Error deleting transaction"});
  }
})

module.exports = router;
