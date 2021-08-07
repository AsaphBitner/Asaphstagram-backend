import carApp from './pages/car-app.cmp.js'
import todoApp from './pages/todo-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import carEdit from './pages/car-edit.cmp.js'
import carDetails from './pages/car-details.cmp.js'
import about from './pages/about.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/car-app',
        component: carApp,
    },
    {
        path: '/todo-app',
        component: todoApp,
    },
    {
        path: '/about',
        component: about,
    },
    {
        path: '/car/edit/:carId?',
        component: carEdit
    },
    {
        path: '/car/:carId',
        component: carDetails
    },
]

export const myRouter = new VueRouter({ routes })