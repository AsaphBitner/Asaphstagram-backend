import { utilService } from "./util.service.js";

const STORAGE_KEY = 'loggedinUser'


export const userService = {
    signup,
    login,
    logout,
    getLoggedInUser,
    saveImg
}

function saveImg(){
    return axios.post('/saveImg', {
        imgUrl: 'bla bla bla yad yada',
        text: 'wow great image beautiful wow',
    })
}




function login(credentials) {
    return axios.post('/login', credentials)
        .then(res => res.data)
        .then(user => {
            console.log('user:', user);
            utilService.saveToStorage(STORAGE_KEY, user)
            return user;
        })
        .catch(error => console.log('Hi Yesh Error!!!',error))
}
function signup(credentials) {
    return axios.post('/signup', credentials)
        .then(res => res.data)
        .then(user => {
            console.log('user:', user);
            utilService.saveToStorage(STORAGE_KEY, user)
            return user;
        })
}
function logout() {
    return axios.post('/logout')
        .then(() => {
            console.log('Logged out');
            // utilService.saveToStorage(STORAGE_KEY, null)
            localStorage.clear()
        })
}

function getLoggedInUser() {
    return utilService.loadFromStorage(STORAGE_KEY)
}