const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...
  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
   console.log('Inserted documents =>', insertResult);

   const findResult = await collection.find({}).toArray();
   console.log('Found documents =>', findResult);

   
// Add a query filter to find only documents which meet the query criteria.
   const filteredDocs = await collection.find({ a: 1 }).toArray();
  console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

//   Only the documents which match 'a' : 3 should be returned.
    //update document
     const updateResult = await collection.updateOne({ a: 2 }, { $set: { b: 1 } });
     console.log('Updated documents =>', updateResult);

     //delete document
     const deleteResult = await collection.deleteMany({ a: 3 });
     console.log('Deleted documents =>', deleteResult);

     const indexName = await collection.createIndex({ a: 1 });
      console.log('index name =', indexName);
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());