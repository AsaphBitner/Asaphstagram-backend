import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CAR_KEY = 'cars'
const CAR_URL = '/api/car/'

_createCars();

export const carService = {
    query,
    remove,
    save,
    getEmptyCar,
    getById,
}

function query() {
    // return storageService.query(CAR_KEY)
    return axios.get(CAR_URL).then(res => res.data)
}

function getById(id) {
    // return storageService.get(CAR_KEY, id)
    return axios.get(CAR_URL + id).then(res => res.data)
}
function remove(carId) {
    // return storageService.remove(CAR_KEY, carId)
    return axios.get(CAR_URL + carId + '/remove').then(res => res.data)
}

function save(car) {
    // if (car._id) {
    //     return storageService.put(CAR_KEY, car)
    // } else {
    //     return storageService.post(CAR_KEY, car)
    // }
    return axios.get(CAR_URL + 'save', {params: car}).then(res => res.data)
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
    return { _id: '', vendor: '', maxSpeed: 0}
}


function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar();
    car._id = utilService.makeId();
    car.vendor = vendor;
    car.maxSpeed = maxSpeed;
    return car;
}



