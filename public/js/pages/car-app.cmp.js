import { carService } from '../services/car.service.js'
import carFilter from '../cmps/car-filter.cmp.js'
import carList from '../cmps/car-list.cmp.js'

export default {
    
    template: `
        <section class="car-app">
            <car-filter @filtered="setFilter" />
            <car-list :cars="cars" @remove="removeCar" />
            <router-link to="/car/edit">Add a new car!</router-link>
            <button @click="nextPage">Next Page</button>
        </section>
    `,
    data() {
        return {
            cars: []
        }
    },
    methods: {
        loadCars() {
            carService.query(this.filterBy)
                .then(cars => this.cars = cars)
        },
        removeCar(carId) {
            carService.remove(carId)
                .then(this.loadCars)
        },
        setFilter(filterBy) {
            carService.setFilter(filterBy)
            this.loadCars()
        },
        nextPage(){
            carService.nextPage()
            this.loadCars()
        }
    },
    computed: {
        // carsToShow() {
        //     // Client side filtering
        //     if (!this.filterBy) return this.cars
        //     const searchStr = this.filterBy.byVendor.toLowerCase()
        //     const carsToShow = this.cars.filter(car => {
        //         return car.vendor.toLowerCase().includes(searchStr)
        //     })
        //     return carsToShow
        // }
    },
    created() {
        this.loadCars()
    },
    components: {
        carFilter,
        carList,
    }
}
