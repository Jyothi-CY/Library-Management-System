const { QueryModel, AnswerModel, BookModel } = require('../models/bookModel');

const createQuery = async (req, res) => {
    const exsistingQuery = await QueryModel.findOne({user_name: req.body.user_name, query: req.body.query});
    if(exsistingQuery) {
        res.status(400).json({message: 'Query already exists'});
        return;
    }
    const query = new QueryModel({
        user_name: req.body.user_name,
        query: req.body.query
    });
    try {
        const newQuery = await query.save();
        const book = await BookModel.findById(req.params.id);
        book.queries.push(newQuery);
        const updatedBook = await book.save();
        
        res.status(201).json(updatedBook);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

const createAnswer = async (req, res) => {
    const { user_name, answer } = req.body;
    try {
        const newAnswer = new AnswerModel({
            user_name,
            answer
        });
        const book = await BookModel.findById(req.params.id);
        const query = book.queries.find(query => query._id.toString() === req.params.qid);
        await newAnswer.save();
        query.answers.push(newAnswer);
        const updatedBook = await book.save();
        res.status(201).json(newAnswer);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
};


const updateAnswer = async (req, res) => {
    const { answerId } = req.body;
    const { user_name: userName } = req.body; 
  
    try {
        const book = await BookModel.findById(req.params.id);
        const query = book.queries.find(query => query._id.toString() === req.params.qid);
        const answer = query.answers.find(answer => answer._id.toString() === answerId);
        if (!answer) {
            res.status(404).json({ message: 'Answer not found' });
            return;
        }
        if (answer.upvotedBy.includes(userName)) {
            answer.upvotedBy = answer.upvotedBy.filter(user => user !== userName);
            answer.upvotes -= 1;
        } else {
            answer.upvotedBy.push(userName);
            answer.upvotes += 1;
        }
        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};


// return all the queries of the user

const getQueries = async (req, res) => {
    console.log("getQueries");
    console.log(req.body.user_name);
    try {
        const queries = await QueryModel.find({user_name: req.body.user_name});
        res.json(queries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteQuery = async (req, res) => {
    const {queryId} = req.body;
    try {
        const query = await QueryModel.findById(queryId);
        const book = await BookModel.findById(req.params.id);
        if (!query) {
            res.status(404).json({ message: 'Query not found' });
            return;
        }
        book.queries = book.queries.filter(query => query._id.toString() !== queryId);
        const updatedBook = await book.save();
        await query.remove();
        res.json(updatedBook, { message: 'Query deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createQuery, createAnswer, getQueries, deleteQuery, updateAnswer};