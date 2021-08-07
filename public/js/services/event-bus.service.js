// Publisher - Subscriber
export const eventBus = new Vue()

export function showUserMsg(msg) {
    eventBus.$emit('show-msg', msg)
}

// Emits, but no one will be notified
// eventBus.$emit('puk', 12);

// eventBus.$on('puk', (val) => {
//     console.log('Puk Happened', val)
// })
// eventBus.$on('puk', (val) => {
//     console.log('Observing that Puk ', val)
// })

// Debug Technique:
window.myBus = eventBus;


// eventBus.$emit('puk', 13);
// setTimeout(()=>{
//     eventBus.$emit('puk', 3);
// }, 200)


// eventBus.$on('puk2', () => {
//     console.log('me too!')
// })