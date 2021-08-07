import { userService } from '../services/user.service.js';
import carPreview from './car-preview.cmp.js'

export default {
    props: ['cars'],
    template: `
    <ul class="car-list">
        <li v-for="car in cars" :key="car._id" class="car-preview-container" >
            <car-preview :car="car" />
            <div class="btns-container">
                <button v-if="userCanEdit(car)" @click="remove(car._id)">X</button>
                <router-link :to="'/car/'+car._id">Details</router-link>
                <router-link v-if="userCanEdit(car)" :to="'/car/edit/'+car._id">Edit</router-link>
            </div>
        </li>
    </ul>
    `,
    methods: {
        remove(carId) {
            this.$emit('remove', carId)
        },
        logId(carId) {
            console.log('Id is', carId);
        },
        userCanEdit(car) {
            const user = userService.getLoggedInUser()
            return user.isAdmin || user._id === car.owner._id
        }
    },
    components:{
        carPreview
    }
}
