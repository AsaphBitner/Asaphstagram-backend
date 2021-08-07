export default {
    props:['car'],
    template:`
    <section class="car-preview">
        <h3>⛐</h3>
        <h2>{{car.vendor}}</h2>
        <p>Max speed: {{car.maxSpeed}}</p>
        <hr />
        <p>
            Owned by: 
            <router-link :to="'/user/'+car.owner._id">{{car.owner.fullname}}</router-link>
        </p>
    </section>
    `,

}

