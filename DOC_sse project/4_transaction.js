import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$group': {
      '_id': '$book_id', 
      'count': {
        '$sum': 1
      }
    }
  },{
    '$project': {
      'book_id': '$_id', 
      'count': 1, 
      '_id': 0
    }
  },{
    '$group': {
      '_id': '$transaction_type', 
      'count': {
        '$sum': 1
      }
    }
  },{
    '$project': {
      'transaction_type': '$_id', 
      'count': 1, 
      '_id': 0
    }
  },{
    '$match': {
      'transaction_date': {
        '$regex': '03'
      }
    }
  }, {
    '$group': {
      '_id': null, 
      'count': {
        '$sum': 1
      }
    }
  }
];

const client = await MongoClient.connect(
  'mongodb+srv://jyothirmayeenisamkarao:k9OsShfjZ68JpVPW@library.j7y5uk2.mongodb.net/'
);
const coll = client.db('library').collection('transactions');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();



