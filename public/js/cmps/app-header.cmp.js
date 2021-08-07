import { userService } from '../services/user.service.js'

export default {
    template: `
   <header class="app-header">
       <div class="logo">
           <h1>Cars</h1>
       </div>
       <nav>
           <router-link active-class="active-link" to="/" exact>Home</router-link> |
           <router-link to="/car-app">Cars App</router-link> |
           <router-link to="/todo-app">Todos App</router-link> |
           <router-link to="/about">About</router-link>
       </nav>
       <section v-if="loggedInUser">
            Hello {{loggedInUser.fullname}}
            <button @click="logout">Logout</button>
        </section>
        
        <form v-else @submit.prevent="login">
            <input type="text" placeholder="username" v-model="credentials.username" />
            <input type="password" placeholder="password" v-model="credentials.password" />
            <button>Login</button>
        </form>


        <form @submit.prevent="saveImg">
            <input type="text" placeholder="username" v-model="credentials.username" />
            <input type="password" placeholder="password" v-model="credentials.password" />
            <button>Login11111111111</button>
        </form>







    </header>
    `,
    data() {
        return {
            credentials: {username: 'puki', password: 'puki1'},
            loggedInUser: userService.getLoggedInUser()
        }
    },
    created() {
            },
    methods: {
        logout() {
            userService.logout()
                .then(() => this.loggedInUser = null)
        },
        login() {
            userService.login(this.credentials)
                .then(user => this.loggedInUser = user)
        },

        async saveImg(){
            let x = await userService.saveImg()
            console.log('SaveImg Log ', x)
    
        },
    },



}
