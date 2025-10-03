const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0
  },
  upvotedBy: {
    type: [String],
    default: []
  }

});

const AnswerModel = mongoose.model("Answer", AnswerSchema);


const QuerySchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  answers: {
    type: [AnswerSchema],
  },
});

const QueryModel = mongoose.model("Query", QuerySchema);

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  Ed: {
    type: String,
    required: false,
  },
  queries: {
    type: [QuerySchema],
  },
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = { BookModel, QueryModel, AnswerModel };
