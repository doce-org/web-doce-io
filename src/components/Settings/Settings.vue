<template>

    <nav class="ui large inverted blue menu">

		<!-- general options -->
        <a v-link="" class="ui item disabled">
			Général
		</a>

		<!-- rooms -->
		<a v-link="{name: 'rooms_list'}" class="ui item">
			Pièces
		</a>

		<!-- ports -->
        <a v-link="{name: 'ports_list'}" class="ui item">
			Ports
		</a>

		<!-- temperatures hardwares -->
        <a v-link="{name: 'temperatures_sensors_list'}" class="ui item">
			Sondes Températures
		</a>

		<!-- power hardware -->
        <a v-link="{name: 'powers_gauges_list'}" class="ui item disabled">
			Jauges Energie
		</a>

    </nav>

    <div class="ui one column padded grid">
        <div class="column">

            <router-view></router-view>

        </div>
    </div>

</template>

<style lang="scss" scoped>

	// menu specific style
    .ui.inverted.blue.menu {
		border-radius: 0;
        background-color: #3498db;
    }

</style>
