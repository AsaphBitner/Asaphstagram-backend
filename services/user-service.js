const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const userCollectionName = 'users';

module.exports = {
    getUserByName,
    getUserById,
    remove,
    update,
    getAll,
    create,
}

async function getUserByName(username) {
    const criteria = {username: username}
    try {
        const collection = await dbService.getCollection(userCollectionName)
        const user = await collection.findOne(criteria)
        delete user.password
        return user;
    } catch (err) {
        console.log('ERROR: cannot find user')
        throw err
    }
}

async function getUserById(userId) {
    try {
        const collection = await dbService.getCollection(userCollectionName)
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: cannot find customer ${customerId}`)
        throw err
    }
}


async function getAll(){
    try {
        const collection = await dbService.getCollection(userCollectionName)        
        let allUsers = await collection.find().toArray()        
        allUsers.forEach(element => {
        delete element.password    
        });
        // console.log(allUsers)
    
        return (allUsers)
    } catch (err) {
        console.log(`ERROR: cannot find collection`)
        throw err
    }
}

async function create(user) {
    try {
        const collection = await dbService.getCollection(userCollectionName)
        const storyWithMongoId = await collection.insertOne(user)
        return storyWithMongoId
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err
    }
}



// /* updates, changes */
async function update(user) {
    try {
        // const storyId = user._id
        const collection = await dbService.getCollection(userCollectionName)
        let userToUpdate = await getUserById(user._id)
        userToUpdate.profileText = user.profileText
        userToUpdate.oldProfileImgs = user.oldProfileImgs.slice()
        userToUpdate.following = user.following.slice()
        userToUpdate.followers = user.followers.slice()
        userToUpdate.ownedStories = user.ownedStories.slice()
        
        await collection.updateOne({ _id: ObjectId(user._id) }, { $set: userToUpdate })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update story ${user._id}`)
        throw err
    }
}




async function remove(userId) {
    try {
        const collection = await dbService.getCollection(userCollectionName)
        return await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove story ${userId}`)
        throw err
    }
}










