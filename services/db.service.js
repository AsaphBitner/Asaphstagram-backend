
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = `mongodb+srv://user-01:asaphb123@cluster0.rzmg8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// Database Name
const dbName = 'asaphstagram';

var dbConn = null;

async function _connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName) {
    const db = await _connect()
    return db.collection(collectionName)
}

module.exports = {
    getCollection
}