<template>

    <nav class="ui left fixed inverted vertical labeled icon menu">

		<!-- dashboard -->
        <a v-link="{name: 'dashboard', exact: true}" class="item">
            <i class="icon home"></i>
            Dashboard
        </a>

		<!-- consumation -->
        <a href="#" class="item disabled">
            <i class="icon dashboard"></i>
            Consommations
        </a>

		<!-- temperatures -->
        <a v-link="{name: 'temperatures', exact: true}" class="item">
            <i class="icon fire"></i>
            Températures
        </a>

		<!-- analyzing -->
        <a href="#" class="item disabled">
            <i class="icon bar chart"></i>
            Analyse
        </a>

		<!-- relations -->
        <a href="#" class="item disabled">
            <i class="icon exchange"></i>
            Mise en relation
        </a>

		<!-- regulate -->
        <a href="#" class="item disabled">
            <i class="icon adjust"></i>
            Régulation
        </a>

		<!-- settings -->
        <a v-link="{name: 'settings'}" class="item">
            <i class="setting icon"></i>
            Paramètres
        </a>

		<!-- help -->
        <a class="item disabled">
            <i class="help icon"></i>
            Aide
        </a>

    </nav>

</template>

<style lang="scss" scoped>

	.menu {
		margin-bottom: 0;
		
		.active {
			border-left: 4px solid #3498db;
		}
	}

</style>
