<template>
    <div class="home">
        <img class="logo" alt="Vue logo" :src="logo">
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <div v-highlight="'yellow'" v-font="'18px'">他说的</div>
    </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import Global from "../modules/Global";

export default defineComponent({
    name: "Home",
    components: {
        HelloWorld,
    },
    setup(props, context) {
        
        onMounted(function () {
            // console.log("执行 >> onMounted", context);
        });

        return Global.images
    },
});
</script>
<style>
.logo {
    width: 280px;
    margin: 0 auto;
}
</style>
