<template>

    <div id="dashboard" class="ui equal height padded grid">

        <section id="weather" class="three wide column">

            <!-- weather -->
            <weather></weather>

        </section>

        <!-- summary -->
        <section class="thirteen wide center aligned column">

            <!-- rooms -->
            <rooms></rooms>

        </section>

    </div>

</template>

<script type="text/babel">

    // components
    import Rooms from './Rooms.vue';
    import Weather from './Others/Weather.vue';

    export default {

        components: {

			Rooms,
			Weather

		}

    }

</script>

<style lang="scss" scoped>

	// dashboard full height
    #dashboard {
        height: 100vh;

		// weather panel style
		#weather {
			padding: 0;
			background: #3498db;
		}

		// permit scolling inside each column directly
		.column {
			overflow-y: auto;
			overflow-x: hidden;
		}
    }



</style>
