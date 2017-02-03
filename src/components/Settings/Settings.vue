<template>

    <nav class="ui large inverted blue menu">
        <a v-link="" class="ui item disabled">Général</a>
        <a v-link="{name: 'ports_list'}" class="ui item">Ports</a>
        <a v-link="{name: 'rooms_list'}" class="ui item">Pièces</a>
        <a v-link="{name: 'temperatures_sensors_list'}" class="ui item">Sondes Températures</a>
        <a v-link="{name: 'powers_gauges_list'}" class="ui item">Jauges Energie</a>
    </nav>
    <div class="ui one column padded grid">
        <div class="column">
            <router-view></router-view>
        </div>
    </div>

</template>

<style lang="scss" scoped>

    .menu {
        border-radius: 0;
    }

    .ui.inverted.blue.menu {
        background-color: #3498db;
    }

</style>
