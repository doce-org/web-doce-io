<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column">

            <table class="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>

                            <button v-link="{name: 'setup_transmitter_create'}" class="button is-success">
                                Ajouter un transmetteur
                            </button>

                        </th>
                    </tr>
                </thead>
                <tbody>

                    <!-- each transmitter -->
                    <tr v-for="transmitter in transmitters">

                        <!-- name -->
                        <td>{{transmitter.name}}</td>

                        <!-- controls -->
                        <td>

                            <button class="button is-danger" disabled>Supprimer</button>

                        </td>

                    </tr>

                </tbody>
            </table>

        </div>
    </div>

</template>

<script>

    // services
    import { transmitterService } from 'services';

    export default {

        data() {
            return {

                // contain the listing of available transmitters
                // @type {Array}
                'transmitters': false

            }
        },

        created() {
            this.findTransmitters();
        },

        methods: {

            /**
             * find the listing of available (registered) transmitters
             * 
             * @author shad
             */ 
            findTransmitters() {

                transmitterService.find()
                .then( transmitters => this.transmitters = transmitters )
                .catch( this.handlingErrors );

            }

        }
    
    }
    
</script>

<style lang="scss" scoped>

    .table {
        background: transparent;
        margin-left: auto;
        margin-right: auto;
    }

</style>

