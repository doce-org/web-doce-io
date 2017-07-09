<template>

    <div id="history" class="ui padded grid">

		<!-- humidity - temperature comparison graph -->
		<div class="eight wide column">
			<humidity-temperature-comparison-graph></humidity-temperature-comparison-graph>
		</div>

    </div>

</template>

<script>

	// components
	import HumidityTemperatureComparisonGraph from './Humidity/HumidityTemperatureComparisonGraph.vue';

    export default {

		components: {

			HumidityTemperatureComparisonGraph

		}

    }

</script>

<style lang="scss" scoped>

	// keep the scrolling internal to this component
	#history {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

</style>
