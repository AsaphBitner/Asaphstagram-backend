const fs = require('fs')

const gCars = require('../data/car.json')


const PAGE_SIZE = 5;

module.exports = {
    query,
    getById,
    remove,
    save
}


function query(filterBy = { txt: '', pageIdx: 0}) {
    // const carsToSend = gCars.filter(car => car.vendor.toLowerCase().includes(filterBy.txt.toLowerCase()))
    const regex = new RegExp(filterBy.txt, 'i')
    const startIdx = filterBy.pageIdx * PAGE_SIZE
    let carsToSend = gCars.filter(car => regex.test(car.vendor))
    carsToSend = carsToSend.slice(startIdx, startIdx + PAGE_SIZE)
    return Promise.resolve(carsToSend)
}

function getById(carId) {
    const car = gCars.find(car => car._id === carId)
    return Promise.resolve(car)
}
function remove(carId, user) {
    const idx = gCars.findIndex(car => car._id === carId && (user.isAdmin || car.owner._id === user._id))
    if (idx >= 0)  {
        gCars.splice(idx, 1)
        return _saveCarsToFile()
    }
    return Promise.reject('Not your car ' + carId)
}

function save(carToSave, user) {
    const car = {
        _id: carToSave._id || _makeId(),
        vendor: carToSave.vendor,
        maxSpeed: carToSave.maxSpeed,
        owner: carToSave.owner
    }
    if (carToSave._id) {
        const idx = gCars.findIndex(car => car._id === carToSave._id && car.owner._id === user._id)
        if (idx === -1) return Promise.reject('Cannot Update Car');
        gCars[idx] = car;
    } else {
        gCars.unshift(car)
    }
    return _saveCarsToFile().then(() => {
        return car;
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

function _saveCarsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/car.json', JSON.stringify(gCars, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}

// _createCars()

function _createTestCars() {
    const vendors = ['Audu Mea', 'Fiak Ibasa', 'Subali Pesha', 'Mitsu Bashi']
    const cars = []
    for (let i = 0; i < 21; i++) {
        const vendor = vendors[parseInt(Math.random()*vendors.length)]
        cars.push(_createCar(vendor + i, parseInt(Math.random()*1000)))
    }
    // cars.forEach(car => save(car))
    gCars = cars
    _saveCarsToFile()
}

function getEmptyCar() {
    return { _id: '', vendor: '', maxSpeed: 0 }
}

 
function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar();
    car._id = _makeId();
    car.vendor = vendor;
    car.maxSpeed = maxSpeed;
    return car;
}
