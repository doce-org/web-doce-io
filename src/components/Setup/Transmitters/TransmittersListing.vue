<template>

    <div class="ui grid">

        <table class="ui table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>
                        <button v-link="{name: 'setup_transmitter_create'}" class="ui basic green button">Ajouter un transmetteur</button>                        
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

                        <button class="ui basic red button">Supprimer</button>

                    </td>

                </tr>

            </tbody>
        </table>

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

