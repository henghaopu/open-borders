<template>
    <div class="container user-profile">
        <div v-if="userProfile" class="card">
            <h2 class="center">{{ userProfile.alias }}'s Wall</h2>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'UserProfile',
    data () {
        return {
            userProfile: null
        }
    },
    created () {
        let usersRef = db.collection('users')
        usersRef.doc(this.$route.params.id).get()
        .then( user => {
            this.userProfile = user.data()
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>
