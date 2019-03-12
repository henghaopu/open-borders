<template>
    <div class="map-container">
        <div id="map" class="google-map"></div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Map',
    data() {
        return {
            lat: 43.4,
            lng: -76.5
        }
    },
    /**
     * when can we create the google map? 
     * We need to wait until we have accessed to the DOM because we want to insert the map into the dom
     * We can't do this in the created hook because it's not mounted the DOM yet. But, we can do it in the mounted hook
     */
    mounted() {
        // get user geolcation
        this.getCurrentLocation()
        // this.renderMap()
        // console.log(firebase.auth().currentUser)
    },
    methods: {
        renderMap() {
            // Create a map object and specify the DOM element for display by using Map constructor.
            // This function/library is included in the path: public > index.html 
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })

            db.collection('users').get().then( users => {
                users.docs.forEach( doc => {
                    let data = doc.data()
                    if (data.geolocation) {
                        let marker = new google.maps.Marker( {
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        // add click event to marker
                        marker.addListener('click', () => {
                            console.log(doc.id)
                        })
                    }
                })
            })
        },
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.lat = position.coords.latitude
                    this.lng = position.coords.longitude
                    
                    this.updateGeoCoords()
                    // this.renderMap()
                }, (err) => {
                    console.log(err)
                    this.renderMap()
                }, { maximumAge: 60000, timeout: 3000 })
            } else {
                console.log("Geolocation is not supported by this browser.")
                // position center by default values
                this.renderMap()
            }
        },
        updateGeoCoords() {
            // get current user
            let user = firebase.auth().currentUser
            // find the user record and then update geocoords
            db.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot => {
                snapshot.forEach( doc => {
                    db.collection('users').doc(doc.id).update({
                        geolocation: {
                            lat: this.lat,
                            lng: this.lng
                        }
                    })
                })
            }).then(() => {
                this.renderMap()
            })
        }
    }
}
</script>

<style>
/* height: calc(100vh - 56px) */
.google-map {
    /* width: 100vw; */
    /* height: 100vh; */

    width: 80vw;
    height: 80vh;
    margin: 5vh auto;
    border: 1px solid gray;
}
</style>