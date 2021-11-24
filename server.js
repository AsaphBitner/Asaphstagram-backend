
// import {usersToUpload} from '1Users-List.js'
const express = require('express')
const cookieParser = require('cookie-parser')
// const session = require('express-session')


// const userService = require('./services/user-service')
// const carService = require('./services/1OLDcar-service')
const storyService = require('./services/story-service')
const userService = require('./services/user-service')
const loginService = require('./services/login-service')
const app = express()
const port = process.env.PORT || 3000

var cors = require('cors')
app.use(cors())



// Express App Configuration
// We ask Express.js to serve static files from the 'public' folder
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())


app.post('/login', async (req, res) => {
    try{
    let loggedIn = await loginService.checkLogin(req.body)
    // console.log('!!!!!!!! ',loggedIn)
    res.send(loggedIn)
    }
    catch (err) {
        console.log('Error! ', err)
    res.status(401).send('Sorry, error')
    }
    
    })



app.get('/user/:userId',async (req, res) => {
try{
    let user = await userService.getUserById(req.params.userId)
res.send(user)
}
catch (err) {
    console.log('Error! ', err)
res.status(401).send('Sorry, error')
}

})


app.get('/username/:name', async (req, res) => {
    try{
        let user = await userService.getUserByName(req.params.name)
    res.send(user)
    }
    catch (err) {
        console.log('Error! ', err)
    res.status(401).send('Sorry, error')
    }

})

app.get('/userAll', async (req, res) => {
    try{
        let users = await userService.getAll()
        // console.log('SERVER JS ', user)
    res.send(users)
    }
    catch (err) {
        console.log('Error! ', err)
    res.status(401).send('Sorry, error')
    }
    
    })

app.post('/user', async (req, res) => {
    let user = req.body
    try{
    newUser = await userService.create(user)    
    res.send(newUser)
    }
    catch (err) {
        console.log('Error! ', err)
res.status(401).send('Sorry, error')
    }
    
})

app.put('/user', async (req, res) => {
    try{
        let user = await userService.update(req.body)
    res.send(user)
    }
    catch (err) {
        console.log('Error! ', err)
res.status(401).send('Sorry, error')
    }
    
})

app.delete('/user', async (req, res) => {
    try{
        let user = await userService.remove(req.query)
    res.send(user)
    }
    catch (err) {
        console.log('Error! ', err)
res.status(401).send('Sorry, error')
    }
    
})


//==================================================================
// app.get('/user/:userId',async (req, res) => {
// 

app.get('/story/:storyId', async (req, res) => {
    try{
        let story = await storyService.getStoryById(req.params.storyId)
        res.send(story)
    }
    catch (err) {
        console.log('Error! ', err)
        res.status(401).send('Sorry, error')
    }

})

app.get('/storyAll', async (req, res) => {
    try{
        let stories = await storyService.getAll()
    res.send(stories)
    }
    catch (err) {
        console.log('Error! ', err)
    res.status(401).send('Sorry, error')
    }
    
    })

app.post('/story', async (req, res) => {
    let story = req.body
    try{
    newStory = await storyService.create(story)    
    res.send(newStory)
    }
    catch (err) {
        console.log('Error! ', err)
res.status(401).send('Sorry, error')
    }
    
})

app.put('/story', async (req, res) => {
    try{
        let story = await storyService.update(req.body)
    res.send(story)
    }
    catch (err) {
        console.log('Error! ', err)
res.status(401).send('Sorry, error')
    }
    
})

app.delete('/story/:storyId', async (req, res) => {
    try{
        let story = await storyService.remove(req.params.storyId)
            res.send(story)
    }
    catch (err) {
        console.log('Error! ', err)
        res.status(401).send('Sorry, error')
    }
})



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})






