
// import {usersToUpload} from '1Users-List.js'
// const usersArray = require('./1Users-List.js')
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const storyCollectionName = 'stories';

module.exports = {
    getStoryById,
    remove,
    update,
    create,
    getAllStories,
}


// async function sortPosts(usersToUpdate){
// //    const x = usersToUpdate.sort((a,b)=> (a.createdAt < b.createdAt ? 1 : -1))
//     // const x = postsToSort
//     for (let i=0; i<usersToUpdate.length; i++){
//     let x = await getStoryById((usersToUpdate[i]._id))
//     x.ownedStories = usersToUpdate[i].ownedStories.slice()
//     const y = await update(x)
//     console.log(i, x.ownedStories)
//     // console.log(postsToSort.length)
//     }

// // console.log(t)
// // console.log(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], 'SUCCESS!!!')
// }


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
        const story = await collection.findOne({ _id: ObjectId(storyId) })
        return story
    } catch (err) {
        console.log(`ERROR: cannot find story ${storyId}`)
        throw err
    }
}

async function getAllStories(){
    try {
        const collection = await dbService.getCollection(storyCollectionName)
        let stories = collection.find()
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
        let storyToUpdate = getStoryById(story._id)
        storyToUpdate.text = story.text
        storyToUpdate.imgUrl = story.imgUrl
        storyToUpdate.likedBy = story.likedBy.slice()
        storyToUpdate.comments = story.comments.slice()

        await collection.updateOne({ _id: ObjectId(story._id) }, { $set: story })
        return story
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

