import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'membership': 'faculty'
    }
  }, {
    '$project': {
      'limit': 3
    }
  }, {
    '$limit': 5
  }
];

const client = await MongoClient.connect(
  'mongodb+srv://jyothirmayeenisamkarao:k9OsShfjZ68JpVPW@library.j7y5uk2.mongodb.net/'
);
const coll = client.db('Userlogin').collection('login');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();