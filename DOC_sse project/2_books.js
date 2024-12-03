import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'isbn': {
        '$exists': true
      }
    }
  }, {
    '$group': {
      '_id': null, 
      'count': {
        '$sum': 1
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'count': 1
    }
  }
];

const client = await MongoClient.connect(
  'mongodb+srv://jyothirmayeenisamkarao:k9OsShfjZ68JpVPW@library.j7y5uk2.mongodb.net/'
);
const coll = client.db('library').collection('books');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();