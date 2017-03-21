<template>

    <section id="app">

		<!-- main navigation menu -->
        <navigation></navigation>

        <div id="body">

			<div class="ui equal height padded grid">

				<!-- main app body -->
				<div id="main" class="thirteen wide column">
					<router-view transition="fade" transition-mode="out-in"></router-view>
				</div>

				<!-- recurrent sidebar controls -->
				<div class="three wide column">
					<sidebar></sidebar>
				</div>

			</div>

        </div>

    </section>

</template>

<script>

	// components
    import Navigation from './Nav.vue';
    import Sidebar from './Sidebar/Sidebar.vue';
	// services
	import { logService } from 'services';

    export default {

        components: {

			Navigation,
			Sidebar

		}

    }

</script>

<style lang="scss">

	// base app styling
	#app {
		height: 100%;

		#body {
			height: 100%;
			background: #fafafa !important;
			margin-left: 131px;

			// prevent the column padding
			#main {
				padding: 0;
			}
		}
	}


	// special header style
	.light {
		font-weight: 300 !important;
	}

</style>
