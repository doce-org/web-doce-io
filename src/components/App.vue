<template>

    <section id="app">

        <navigation></navigation>

        <div id="body">

            <router-view></router-view>

        </div>

    </section>

</template>

<script>

	// components
    import Navigation from './Nav.vue';
	// services
	import { logService } from 'services';

    export default {

        components: {

			Navigation

		}

    }

</script>

<style src="../../node_modules/metrics-graphics/dist/metricsgraphics.css"></style>

<style lang="scss">

	#app {
		height: 100%;
	}

	#body {
		height: 100%;
		background: #fafafa !important;
		margin-left: 131px;
	}

	// special header style
	.light {
		font-weight: 300 !important;
	}

</style>
