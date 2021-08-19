
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
const port = 3000

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


app.get('/story', async (req, res) => {
    try{
        let story = await storyService.getStoryById(req.query)
    res.send(story)
    }
    catch (err) {
        console.log('Error! ', err)
    res.status(401).send('Sorry, error')
    }

})

app.get('/storyAll', async (req, res) => {
    try{
        let story = await storyService.getAll()
    res.send(story)
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























// app.use(session({
//     secret: 'some secret token',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
//  }))
 

// app.get('/puki', (req, res) => {
//     var visitCount = req.cookies.visitCount || 0;
//     visitCount++;
//     res.cookie('visitCount', visitCount)

//     res.send('Hello Puki')
// })
// app.get('/nono', (req, res) => res.redirect('/puki'))

 
// app.post('/saveImg', (req, res) => {
// console.log(req)
// res.json({id: 11111,
//           name: 'Homer Simpson',
//         })
// } 
// )









// //LOGIN
// app.post('/login', (req, res) => {
//     const credentials = req.body;
//     userService.checkLogin(credentials)
//         .then(user => {
//             if (user) {
//                 req.session.loggedinAt = Date.now();
//                 req.session.loggedinUser = user;
//                 res.json(user);
//             } else {
//                 res.status(401).send('Please login')
//             }
//         })
// })
// app.post('/logout', (req, res) => {
//     req.session.destroy();
//     res.end();
// })

// app.post('/signup', (req, res) => {
//     const credentials = req.body
//     userService.save(credentials)
//         .then(user => {
//                 req.session.loggedinAt = Date.now();
//                 req.session.loggedinUser = user;
//                 res.json(user)
//         })
// })

// // The Car API

// // CAR List
// app.get('/api/car', (req, res) => {
//     const filterBy = {
//         txt: req.query.txt || '',
//         pageIdx: req.query.pageIdx || 0
//     }
//     carService.query(filterBy)
//         .then(cars => res.json(cars))
// })

// // CAR Read single
// app.get('/api/car/:carId', (req, res) => {
//     const { carId } = req.params
//     carService.getById(carId)
//         .then(car => {
//             res.json(car)
//         })
// })


// // CAR Create
// app.post('/api/car', (req, res) => {
//     const { loggedinUser } = req.session;
//     if (!loggedinUser) return res.status(401).send('Please login');
//     const { vendor, maxSpeed } = req.body
//     const car = {
//         owner: {_id: loggedinUser._id, fullname : loggedinUser.fullname},
//         vendor,
//         maxSpeed,
//     }
//     carService.save(car, loggedinUser)
//         .then(savedCar => {
//             console.log('savedCar:', savedCar)
//             res.json(savedCar)
//         })
// })

// // CAR Update
// app.put('/api/car', (req, res) => {
//     const { loggedinUser } = req.session;
//     if (!loggedinUser) return res.status(401).send('Please login');

//     const { _id, vendor, maxSpeed } = req.body
//     const car = {
//         _id,
//         vendor,
//         maxSpeed,
//         owner: {_id: loggedinUser._id, fullname : loggedinUser.fullname},
//     }
//     carService.save(car, loggedinUser)
//         .then(savedCar => {
//             res.json(savedCar)
//         })
//         .catch(err => {
//             console.log('Cannot save car:', car, err);
//             res.status(403).send('Cannot save car');
//         })
// })

// // CAR Delete
// app.delete('/api/car/:carId', (req, res) => {
//     const { loggedinUser } = req.session;
//     if (!loggedinUser) return res.status(401).send('Please login');

//     const { carId } = req.params
//     carService.remove(carId, loggedinUser)
//         .then(() => {
//             res.json('Done!')
//         })
//         .catch(err => {
//             console.log('Cannot remove car:', carId, err);
//             res.status(403).send('Cannot delete car');
//         })
// })


// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`)
// })

app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${process.env.PORT || port}`)
})






