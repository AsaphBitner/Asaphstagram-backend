const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const userCollectionName = 'user';

module.exports = {
    getUser,
    getById,
    // remove,
    // update,
    // add
}

async function getUser(username) {
    const criteria = {username: username}
    try {
        const collection = await dbService.getCollection(userCollectionName)
        const user = await collection.findOne(criteria)
        return user;
    } catch (err) {
        console.log('ERROR: cannot find user')
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection(userCollectionName)
        const user = await collection.findOne({ _id: ObjectId(userId) })
        return user
    } catch (err) {
        console.log(`ERROR: cannot find customer ${customerId}`)
        throw err
    }
}



