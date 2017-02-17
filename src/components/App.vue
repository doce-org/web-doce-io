<template>

    <section>
        <navigation></navigation>
        <div style="margin-left: 132px;">
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

		},

		ready() {
			this.logsToConsole();
		},

		methods: {

			logsToConsole() {

				logService.on( 'created', data => {

					console.log( data.message );

				} );

			}

		}

    }

</script>

<style src="../../node_modules/metrics-graphics/dist/metricsgraphics.css"></style>
