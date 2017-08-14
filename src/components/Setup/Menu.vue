<template>

    <div class="columns is-centered is-vcentered">

        <div v-link="{name: 'setup_rooms_listing'}" class="column is-centered">

            <!-- <span class="icon has-text-centered is-large">
                <i class="fa fa-home"></i>
            </span> -->
            <h2 class="title has-text-centered">Gestion des Pieces</h2>
            <div class="subtitle is-5 has-text-centered">Ajouter et modifier les pieces de votre logement.</div>

        </div>

        <div v-link="{name: 'setup_hardwares_listing'}" class="column is-centered">

            <!-- <span class="icon has-text-centered is-large">
                <i class="fa fa-podcast"></i>
            </span> -->
            <h2 class="title has-text-centered">Gestion des Materiels</h2>
            <div class="subtitle is-5 has-text-centered">Ajouter et modifier vos materiels.</div>

        </div>

    </div>

</template>

<script>

    export default {

    }

</script>

<style lang="scss" scoped>

    .column {
        cursor: pointer;
    }

</style>
