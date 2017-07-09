<template>

	<div class="ui grid">

		<!-- serial / server connexion -->
		<connexion></connexion>

		<div class="ui equal height grid">

			<!-- thermostat -->
			<thermostat></thermostat>

			<!-- activities -->
			<activity></activity>

		</div>
	</div>

</template>

<script>

	// components
	import Connexion from './Connexion.vue';
	import Thermostat from './Thermostat.vue';
	import Activity from './Activity.vue';

    export default {

		components: {

			Connexion,
			Thermostat,
			Activity

		}

    }

</script>

<style lang="scss" scoped>

	// make sure the controls sidebar take all the room
	.ui.grid:not( .equal.height ) {
		height: 100vh;
	}

	.ui.equal.height.grid {
		height: calc( 100vh - 40px );
		margin-top: 0;
		overflow: auto;
	}

</style>
