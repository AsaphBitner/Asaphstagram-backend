const fs = require('fs')

const gUsers = require('../data/user.json')


const PAGE_SIZE = 5;

module.exports = {
    getById,
    save,
    checkLogin
}

function checkLogin(credentials) {
    var user = gUsers.find(user => user.username === credentials.username && user.password === credentials.password)
    if (user) {
        user = {...user}
        delete user.password
    }
    return Promise.resolve(user)
}
function getById(userId) {
    const user = gUsers.find(user => user._id === userId)
    return Promise.resolve(user)
}

function save(userToSave) {
    const user = {
        _id: userToSave._id || _makeId(),
        fullname: userToSave.fullname,
        username: userToSave.username,
        password: userToSave.password,
        balance: 100
    }
    if (userToSave._id) {
        const idx = gUsers.findIndex(user => user._id === userToSave._id)
        gUsers[idx] = user;
    } else {
        gUsers.unshift(user)
    }
    return _saveUsersToFile().then(() => {
        delete user.password
        return user;
    })
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}

// _createUsers()

function _createTestUsers() {
    const vendors = ['Audu Mea', 'Fiak Ibasa', 'Subali Pesha', 'Mitsu Bashi']
    const users = []
    for (let i = 0; i < 21; i++) {
        const vendor = vendors[parseInt(Math.random()*vendors.length)]
        users.push(_createUser(vendor + i, parseInt(Math.random()*1000)))
    }
    // users.forEach(user => save(user))
    gUsers = users
    _saveUsersToFile()
}

function getEmptyUser() {
    return { _id: '', vendor: '', maxSpeed: 0 }
}

 
function _createUser(vendor, maxSpeed = 250) {
    const user = getEmptyUser();
    user._id = _makeId();
    user.vendor = vendor;
    user.maxSpeed = maxSpeed;
    return user;
}
