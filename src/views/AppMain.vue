<template>
    <div class="app-main">
        <div style="margin-bottom: 16px">
            <router-link tag="button" class="button" to="/home">Home</router-link>
            <span style="margin: 0 12px">|</span>
            <router-link tag="button" class="button" to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>
<script>
// import { defineComponent, reactive } from "vue";

// export default defineComponent({
//     setup(props, context) {
        
//     }
// })
</script>
<style scoped>
.app-main{ width: 100%; }
.app-main a {
    font-weight: bold;
    color: #2c3e50;
    padding: 6px 12px;
}

.app-main a.router-link-exact-active {
    color: #42b983;
}
</style>