<template>
    <div class="map-container">
        <div id="map" class="google-map"></div>
    </div>
</template>

<script>
export default {
    name: 'Map',
    data() {
        return {
            lat: 43.4,
            lng: -76.5
        }
    },
    mounted() {
        this.renderMap()
    },
    methods: {
        renderMap() {
            // Create a map object and specify the DOM element for display.
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })
        },
        // getCurrentLocation() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(position => {
        //             this.lat = position.coords.latitude
        //             this.lng = position.coords.longitude
        //         })
        //     } else {
        //         console.log("Geolocation is not supported by this browser.")
        //     }
        // }
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