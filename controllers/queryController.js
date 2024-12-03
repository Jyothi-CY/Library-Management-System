const { QueryModel, AnswerModel, BookModel, UpvoteModel } = require('../models/bookModel');

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
    const answer = new AnswerModel({
        user_name: req.body.user_name,
        answer: req.body.answer,
        queryId: req.params.qid
    });
    try {
        const newAnswer = await answer.save();
        const book = await BookModel.findById(req.params.id);
        const query = book.queries.find(query => query._id.toString() === req.params.qid);
        if (!query) {
            res.status(404).json({ message: 'Query not found' });
            return;
        }
        query.answers.push(newAnswer);
        const updatedBook = await book.save();
        res.status(201).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateAnswer = async (req, res) => {
    try {
        const answer = await AnswerModel.findById(req.body.answerId);
        if(answer.upvotes === undefined) {
            const upvotes = await UpvoteModel.create({count: 0, user_name: []});
            await upvotes.save();
            answer.upvotes = upvotes;
            await answer.save();

        }
        for (const voted_user of answer.upvotes.user_name)
            if (req.user.user_name === voted_user || req.user.user_name === "null")
                throw Error("Can't Upvote");
        answer.upvotes.count += 1;
        answer.upvotes.user_name.push(req.user.user_name);
        await answer.save();
        res.json(answer);
    } catch(error) {
        res.status(400).json({message: error.message})

    }
}


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