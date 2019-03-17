<template>
    <div class="login container">
        <form class="card-panel" @submit.prevent="login">
            <h2 class="center ">Login</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn">Log In</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'LogIn',
    data() {
        return {
            email: null,
            password: null,

            feedback: null
        }
    },
    methods: {
        login() {
            if (this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then( cred => {
                    console.log(cred.user)
                    this.$router.push({ name: 'map'} )
                })
                .catch( (err) => {
                    console.log(err)
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = "Woops, forgot to fill out all the blanks?"
            }
        }
    }
}
</script>

<style>
.login {
    max-width: 400px;
    margin-top: 60px;
}

.login > form > h2 {
    font-size: 2.4rem;
    color: #039be5;
    margin-top: 0rem;
}
.field {
    margin-bottom: 1rem;
}
.btn {
    background: #1e88e5 ;
}
</style>