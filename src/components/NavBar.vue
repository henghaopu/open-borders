<template>
    <nav class="my-nav">
        <router-link :to="{ name: 'map' }" class="brand-logo left">Open Borders</router-link>
        <ul class="right">
            <!-- named route -->
            <li v-if="!user"><router-link :to="{ name: 'signup' }">Sign Up</router-link></li>
            <li v-if="!user"><router-link :to="{ name: 'login' }">Log In</router-link></li>
            <li v-if="user"><a>{{user.email}}</a></li>
            <li v-if="user"><a @click="logout">Log Out</a></li>
        </ul>
    </nav>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'NavBar',
    data() {
        return {
            user: null
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'login'})
            })
        }
    },
    created() {
        firebase.auth().onAuthStateChanged( (user) => {
            // logged in
            if (user) {
                this.user = user
                console.log(user)
            } else {
                this.user = null
            }
        })
    }
}
</script>

<style>
nav {
    background-color: hsla(55, 100%, 95%, 1); 
}
.my-nav a {
    color: #039be5;

}
/* On screens that are 320px wide or less */
@media screen and (max-width: 320px) {
    .my-nav > a {
        font-size: 1.5rem;        
    }
}
/* On screens that are 1024px wide or more */
@media screen and (min-width: 1024px) {
    .my-nav > a {
        padding-left: 1rem;
    }
}
</style>