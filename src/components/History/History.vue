<template>

    <div id="history" class="ui padded one column grid">

		<div class="column">
			<h2 class="ui dividing header">Historique</h2>

			<div class="ui grid">

				<!-- humidity - temperature comparison graph -->
				<div class="eight wide column">
					<!--<humidity-temperature-comparison-graph></humidity-temperature-comparison-graph>-->
				</div>

			</div>

		</div>

    </div>

</template>

<script>

	// components
	// import HumidityTemperatureComparisonGraph from './Humidity/HumidityTemperatureComparisonGraph.vue';

    export default {

		components: {

			// HumidityTemperatureComparisonGraph

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
