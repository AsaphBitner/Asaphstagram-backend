const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const userCollectionName = 'loggedinuser';
// const userService = require('user-service')


module.exports = {
    // getLoggedInUser,
    // update,
    checkLogin,
    // logout,
}







// async function getLoggedInUser() {
//     try {
//         const collection = await dbService.getCollection(userCollectionName)
//         const user = await collection.findOne()
//         // console.log('!!!!!!!!!!!!!!!!!',user)
//         user._id = user.userId
//         delete user.userId
//         return user;
//     } catch (err) {
//         console.log('ERROR: cannot find user')
//         throw err
//     }
// }

async function checkLogin(attempt) {
    try {
        const loggedInUser = {}
        // const collection = await dbService.getCollection(userCollectionName)
        // let loggedIn = collection.findOne()
        // if (loggedIn.userId) {console.log('Please Log Out First'); return 'Problem'}
        const collection = await dbService.getCollection('users')
        const compare = await collection.findOne({username: attempt.username})
        if (attempt.username !== compare.username || attempt.password !== compare.password) {return 'Problem'}
        else {
            loggedInUser._id = compare._id
            loggedInUser.username = compare.username
            loggedInUser.fullname = compare.fullname
            loggedInUser.profileImgUrl = compare.profileImgUrl
        // }
        // update(usertoupdate)
        // console.log(compare)
        return loggedInUser
    }
    } 
    catch (err) {
        console.log(`ERROR: cannot log in`)
        throw err
    }
}

// async function logout() {
//     try {
//         const userToUpdate = {}
//         // const collection = await dbService.getCollection(userCollectionName)
//         // let loggedIn = collection.findOne()
//         // if (loggedIn.userId) {console.log('Please Log Out First'); return 'Problem'}
//         // const compare = await dbService.getCollection('users').findOne({ _id: ObjectId(user._id) })
//         // if (user.username !== compare.username || user.password !== compare.password) {return 'Problem'}
//         // else {
//             userToUpdate.userId = ''
//             userToUpdate.username = ''
//             userToUpdate.fullname = ''
//             userToUpdate.profileImgUrl = ''
//         // }
//         update(userToUpdate)
//         return 'SUCCESS'

//     } catch (err) {
//         console.log(`ERROR: cannot login`)
//         throw err
//     }
// }



// // /* updates, changes */
// async function update(usertoupdate) {
//     try {
//         // const storyId = user._id
//         const collection = await dbService.getCollection(userCollectionName)
//         let one = collection.findOne()
//         // // await getUserById(user._id)
//         // userToUpdate.profileText = user.profileText
//         // userToUpdate.oldProfileImgs = user.oldProfileImgs
//         // userToUpdate.following = user.following
//         // userToUpdate.followers = user.followers
//         // userToUpdate.ownedStories = user.ownedStories
        
//         await collection.updateOne({ _id: ObjectId(one._id) }, { $set: usertoupdate })
//         return 'SUCCESS'
//     } catch (err) {
//         console.log(`ERROR: cannot update`)
//         throw err
//     }
// }











