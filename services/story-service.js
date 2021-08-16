
// import {usersToUpload} from '1Users-List.js'
// const usersArray = require('./1Users-List.js')
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const storyCollectionName = 'posts';

module.exports = {
    getStoryById,
    remove,
    update,
    create,
    getAll,
}





async function create(story) {
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        const confirmation = await collection.insertOne(story)
        // console.log('IN SERVER: ', confirmation.insertedId)
        const newStoryId = confirmation.insertedId.toString()
        const storyWithMongoId = await getStoryById(newStoryId)
        return storyWithMongoId
    } catch (err) {
        console.log(`ERROR: cannot insert story`)
        throw err
    }
}

async function getStoryById(storyId) {
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        const story = await collection.findOne({ _id: ObjectId(storyId) })
        return story
    } catch (err) {
        console.log(`ERROR: cannot find story ${storyId}`)
        throw err
    }
}

async function getAll(){
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        let stories = await collection.find().toArray()        
        return stories
    } catch (err) {
        console.log(`ERROR: cannot find collection`)
        throw err
    }
}

/* like, unlike, comment and any changes */
async function update(story) {
    try {
        // const storyId = story._id
        const collection = await dbService.getCollection(storyCollectionName)
        let storyToUpdate = {} 
        // getStoryById(story._id)
        storyToUpdate.text = story.text
        storyToUpdate.imgUrl = story.imgUrl
        storyToUpdate.likedBy = story.likedBy
        storyToUpdate.comments = story.comments
        
        await collection.updateOne({ _id: ObjectId(story._id) }, { $set: storyToUpdate })
        return storyToUpdate
    } catch (err) {
        console.log(`ERROR: cannot update story ${story._id}`)
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

