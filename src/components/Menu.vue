<template>
  
    <div id="menu">

        <div class="columns is-centered is-vcentered">

            <div class="column is-half is-narrow">
                <h4 v-on:click="handleMenuChoice('dashboard')" class="subtitle has-text-centered is-4">Panneau de Controle</h4>
                <h4 v-on:click="handleMenuChoice('setup')" class="subtitle has-text-centered is-4">Setup</h4>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        methods: {

            /**
             * handle menu route user choices
             *
             * @param {String} name
             *
             * @author shad
             */
            handleMenuChoice( name ) {

                // reroute
                this.$router.go( { name } );

                // then close the current menu
                this.$emit('closing');

            }

        }
    
    }

</script>


<style lang="scss">

    #menu {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        width: 100vw;
        height: 100vh;
        background: #E7EBEE;

        .columns {
            height: 100vh;

            h4 {
                cursor: pointer;
            }
        }
    }

</style>

