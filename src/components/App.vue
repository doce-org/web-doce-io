<template>

    <section>
        <navigation></navigation>
        <div style="margin-left: 132px;">
            <router-view></router-view>
        </div>
    </section>

</template>

<script>

    import navigation from './Nav.vue';

    export default {
        components: { navigation }
    }

</script>

<style src="../../node_modules/metrics-graphics/dist/metricsgraphics.css"></style>
