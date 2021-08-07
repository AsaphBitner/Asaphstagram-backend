import { userService } from "../services/user.service.js"

export default {
    template: `
    <section class="home app-main">
        <h1>Home sweet home</h1>
        <form v-if="!loggedInUser" @submit.prevent="signup">
            <h2>Signup</h2>
            <input type="text" placeholder="Your full name" v-model="credentials.fullname" />
            <input type="text" placeholder="username" v-model="credentials.username" />
            <input type="password" placeholder="password" v-model="credentials.password" />
            <button>Login</button>
        </form>
     
    </section>
    `,
    data() {
        return {
            loggedInUser: userService.getLoggedInUser(),
            credentials: {fullname: 'Muki Fasd', username: 'muki', password: 'muki1'},
        }
    },
    methods: {
        signup() {
            userService.signup(this.credentials)
                .then(user => this.loggedInUser = user)
        },
    }
}