<template>

	<div>

		<nav class="ui large inverted blue menu">

			<a v-link="{name: 'setup'}" class="item">
				<i class="settings icon"></i>
				Mode Initialisation
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
