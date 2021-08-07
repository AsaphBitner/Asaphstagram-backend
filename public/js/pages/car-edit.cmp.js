import { carService } from '../services/car.service.js'
import { showUserMsg } from '../services/event-bus.service.js'

export default {
    template: `
   <section v-if="carToEdit" class="car-edit app-main">
        <h3>{{title}}</h3>
        <form @submit.prevent="save">
            <input type="text" placeholder="Vendor" v-model="carToEdit.vendor">
            <input type="number" placeholder="Max speed" v-model.number="carToEdit.maxSpeed">
            <button>Save</button>
        </form>
   </section>
    `,
    data() {
        return {
            carToEdit: null
        }
    },
    
    methods: {
        save() {
            carService.save(this.carToEdit)
                .then(car => {
                    console.log('Saved Car:', car);
                    showUserMsg({
                        txt: 'Car saved succesfully',
                        type: 'success'
                    });
                    this.$router.push('/car-app')
                })
                .catch(err => {
                    console.log(err);
                    showUserMsg({
                        txt: 'Error, please try again later',
                        type: 'error'
                    })
                })
        }
    },
    computed: {
        title() {
            return this.carId ? 'Car Edit' : 'Car Add'
        },
        carId() {
            return this.$route.params.carId
        }
    },
    created() {
        if (this.carId) {
            carService.getById(this.carId).then(car => this.carToEdit = car)
        } else {
            this.carToEdit = carService.getEmptyCar()
        }
    }
   
}
