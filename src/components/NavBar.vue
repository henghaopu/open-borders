<template>
    <nav class="my-nav">
        <a href="" class="brand-logo left">Open Borders</a>
        <ul class="right">
            <!-- named route -->
            <li><router-link :to="{name: 'signup'}">Sign Up</router-link></li>
            <li><a href="">Log In</a></li>
        </ul>
    </nav>
</template>


<script>
export default {
    name: 'NavBar',
    data() {
        return {
            
        }
    },
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