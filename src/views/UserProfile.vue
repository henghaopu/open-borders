<template>
    <div class="container user-profile">
        <div v-if="userProfile" class="card">
            <h2 class="center">{{ userProfile.alias }}'s Wall</h2>
            <ul class="comments collection">
                <li>Comment</li>
            </ul>
            <form @submit.prevent="addComment">
                <div class="field">
                    <label for="comment">Add a comment</label>
                    <input type="text" id="comment" v-model="newComment">
                    <p v-if="feedback" class="red-text center">{{ feedback }}</p>
                    <button>SEND</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'UserProfile',
    data () {
        return {
            user: null,
            userProfile: null,
            newComment: null,
            feedback: null
        }
    },
    created () {
        let usersRef = db.collection('users')

        // get current user
        usersRef.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then( collection => {
            collection.forEach( doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        })

        usersRef.doc(this.$route.params.id).get()
        .then( user => {
            this.userProfile = user.data()
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        addComment() {
            if (this.newComment) {
                this.feedback = null
                db.collection('comments').add({
                    from: this.user.id,
                    to: this.$route.params.id,
                    content: this.newComment,
                    time: Date.now()
                }).then( () => {
                    this.newComment = null
                })
            } else {
                this.feedback = `Woops, there's no comment left.`
            }
        }
    }
}
</script>

<style>

</style>
