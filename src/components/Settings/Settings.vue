<template>

	<div>

		<nav class="ui large inverted blue menu">

			<!-- general options -->
			<a v-link="" class="ui item disabled">
				Général
			</a>

			<!-- rooms -->
			<a v-link="{name: 'rooms_list'}" class="ui item">
				Pièces
			</a>

			<!-- temperatures hardwares -->
			<a v-link="{name: 'hardwares_list'}" class="ui item">
				Materiels
			</a>

		</nav>

		<div class="ui one column padded grid">
			<div class="column">

				<router-view transition="fly-right" transition-mode="out-in"></router-view>

			</div>
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
