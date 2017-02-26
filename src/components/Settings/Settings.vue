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
        <a v-link="{name: 'sensors_list'}" class="ui item">
			Sondes
		</a>

		<!-- power hardware -->
        <a v-link="{name: 'meters_list'}" class="ui item">
			Compteurs
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
