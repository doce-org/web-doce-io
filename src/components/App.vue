<template>

    <section id="app">

		<div class="columns is-gapless">

			<router-view></router-view>

			<sidebar></sidebar>

		</div>

    </section>

</template>

<script>

	// components
    import Sidebar from './Sidebar/Sidebar.vue';

    export default {

        components: {

			Sidebar

		}

    }

</script>

<style lang="sass">

	// special styles for bulma 

	// Import the initial variables
	@import "../../node_modules/bulma/sass/utilities/initial-variables";

	// use quicksand font
	$family-primary: 'Quicksand', sans-serif;

	@import "../../node_modules/bulma/bulma.sass";

</style>

<style lang="scss">

	body {
		overflow: hidden;
	}

	// base app styling
	#app {
		height: 100vh;
	}

</style>
