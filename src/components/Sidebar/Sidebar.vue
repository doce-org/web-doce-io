<template>

	<div class="column is-narrow">

		<div class="columns is-marginless">

			<connexion></connexion>

			<thermostat></thermostat>

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
	.column {
		width: 300px;
		background: #252d3a;

		.columns {
			height: 100vh;
			flex-direction: column;
		}
	}

</style>
