<template>
    <div class="signup container">
        <form class="card-panel" @submit.prevent="signup">
            <h2 class="center">Sign-Up</h2>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" id="alias" v-model="alias">
            </div>
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
                <button class="btn">Sign Up</button>
            </div>
        </form>
    </div>
</template>


<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'SignUp',
    data () {
        return {
            alias: null,
            email: null,
            password: null,

            feedback: null,
            slug: null
        }
    },
    methods: {
        // inside signup() is where we interact with Firebase Auth to sign up new users
        signup() {
            if (this.alias && this.email && this.password) {
                this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if (doc.exists) {
                        this.feedback = 'This alias already exists.'
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            console.log(cred.user)
                            ref.set({
                                alias: this.alias,
                                geolocation: null,
                                user_id: cred.user.uid
                            })
                        })
                        .then(() => {
                            // redirect user to the home page
                            this.$router.push({ name: 'map'})
                        })
                        .catch(err => {
                            console.log(err)
                            this.feedback = err.message
                        })
                        this.feedback = 'This alias is free to use.'
                    }
                })
                console.log(this.slug)
            } else {
                this.feedback = "Woops, forgot to fill out all the blanks?"
            }
        }
    }
}
</script>

<style>
.signup {
    max-width: 400px;
    margin-top: 60px;
}

.signup > form > h2 {
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