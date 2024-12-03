import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$sort': {
      'name': 1
    }
  }, {
    '$match': {
      'role': 'Assistant Librarian'
    }
  }
];

const client = await MongoClient.connect(
  'mongodb+srv://jyothirmayeenisamkarao:k9OsShfjZ68JpVPW@library.j7y5uk2.mongodb.net/'
);
const coll = client.db('library').collection('librarians');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();