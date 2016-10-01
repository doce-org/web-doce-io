<template>

    <nav class="ui left fixed inverted vertical labeled icon menu">
        <a v-link="{name: 'dashboard', exact: true}" class="item">
            <i class="icon home"></i>
            Dashboard
        </a>
        <a href="#" class="item disabled">
            <i class="icon dashboard"></i>
            Consommations
        </a>
        <a href="#" class="item disabled">
            <i class="icon fire"></i>
            Températures
        </a>
        <a href="#" class="item disabled">
            <i class="icon bar chart"></i>
            Analyse
        </a>
        <a href="#" class="item disabled">
            <i class="icon exchange"></i>
            Mise en relation
        </a>
        <a href="#" class="item disabled">
            <i class="icon adjust"></i>
            Régulation
        </a>
        <a v-link="{name: 'settings'}" class="item">
            <i class="setting icon"></i>
            Paramètres
        </a>
        <a class="item disabled">
            <i class="help icon"></i>
            Aide
        </a>
    </nav>

</template>

<script type="text/babel">

    export default {}

</script>

<style lang="scss" scoped>

    .active {
        border-left: 4px solid #3498db;
    }

</style>