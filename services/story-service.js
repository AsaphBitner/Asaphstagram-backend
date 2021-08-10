
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const storyCollectionName = 'posts';

module.exports = {
    getStoryById,
    remove,
    update,
    create,
    testing
}

// (function(){console.log('TESTING OT SEE IF THIS WORKS')})()

async function testing(){
let x = {
    user: 'HomerS',
    text: 'Hello! Testing testing',
    time: Date.now()-100,
} 
let y = await create(x)
console.log(y, 'SUCCESS')
}

async function create(story) {
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        const storyWithMongoId = await collection.insertOne(story)
        return storyWithMongoId
    } catch (err) {
        console.log(`ERROR: cannot insert story`)
        throw err
    }
}

async function getStoryById(storyId) {
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        const story = await collection.findOne({ _id: ObjectId(userId) })
        return story
    } catch (err) {
        console.log(`ERROR: cannot find story ${storyId}`)
        throw err
    }
}

/* like, unlike, comment and any changes */
async function update(story) {
    try {
        const storyId = story._id
        const collection = await dbService.getCollection(storyCollectionName)
        await collection.updateOne({ _id: ObjectId(storyId) }, { $set: story })
        return customer
    } catch (err) {
        console.log(`ERROR: cannot update customer ${customer._id}`)
        throw err
    }
}


async function remove(storyId) {
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        return await collection.deleteOne({ _id: ObjectId(storyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove story ${storyId}`)
        throw err
    }
}

