import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CAR_KEY = 'cars'

const gFilterBy = { txt: '', pageIdx: 0 }

// _createCars();

export const carService = {
    query,
    remove,
    save,
    getEmptyCar,
    getById,
    setFilter,
    nextPage
}

function setFilter(filterBy) {
    gFilterBy.txt = filterBy.txt
    gFilterBy.pageIdx = 0
}

function nextPage() {
    gFilterBy.pageIdx++;
}

function query() {
    // return storageService.query(CAR_KEY)
    return axios.get('/api/car', { params: gFilterBy }).then(res => res.data)
}

function getById(carId) {
    // return storageService.get(CAR_KEY, carId)
    return axios.get(`/api/car/${carId}`).then(res => res.data)
}
function remove(carId) {
    // return storageService.remove(CAR_KEY, carId)
    return axios.delete(`/api/car/${carId}`).then(res => res.data)
}

function save(car) {
    // var queryParams = `vendor=${car.vendor}&maxSpeed=${car.maxSpeed}`
    if (car._id) {
        // queryParams += `&_id=${car._id}`
        // return storageService.put(CAR_KEY, car)
        return axios.put(`/api/car`, car).then(res => res.data)
    } else {
        // return storageService.post(CAR_KEY, car)
        return axios.post(`/api/car`, car).then(res => res.data)
    }
}



function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('Audu Mea', 300));
        cars.push(_createCar('Fiak Ibasa', 120));
        cars.push(_createCar('Subali Pesha', 100));
        cars.push(_createCar('Mitsu Bashi', 150));
        utilService.saveToStorage(CAR_KEY, cars)
    }
    return cars;
}

function getEmptyCar() {
    return { _id: '', vendor: '', maxSpeed: 0 }
}


function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar();
    car._id = utilService.makeId();
    car.vendor = vendor;
    car.maxSpeed = maxSpeed;
    return car;
}



