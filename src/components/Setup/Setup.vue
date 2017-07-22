<template>

    <div class="ui one column grid">

        <div class="column">
            <div class="ui menu">

                <a v-link="{name: 'dashboard'}" class="item">
                    <i class="sign out icon"></i>
                    Quitter le mode d'initialisation
                </a>

            </div>
        </div>

        <div class="column body">
            <router-view transition="fade" transition-mode="out-in"></router-view>
        </div>

    </div>

</template>

<script>

    export default {
    
    }

</script>

<style lang="scss" scoped>

    // special grid style
    .ui.one.column.grid {

        // menu col. style
        & > .column:first-child {
            padding-bottom: 0;

            .ui.menu {
                border-radius: 0;
                border: none;
                box-shadow: none;
            }
        }

        // menu grid col. style
        .column.body {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    }

</style>



