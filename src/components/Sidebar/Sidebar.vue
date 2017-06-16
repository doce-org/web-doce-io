<template>

	<div class="ui equal height grid">

		<!-- thermostat -->
		<thermostat></thermostat>

		<!-- activities -->
		<activity></activity>

	</div>

</template>

<script>

	// components
	import Thermostat from './Thermostat.vue';
	import Activity from './Activity.vue';

    export default {

		components: {

			Thermostat,
			Activity

		}

    }

</script>

<style lang="scss" scoped>

	// make sure the controls sidebar take all the room
	.ui.grid {
		height: 100vh;
	}

</style>
