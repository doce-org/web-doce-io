<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-half is-narrow">

            <div class="level">
                <div class="level-left">
                    <div class="level-item">

                        <!-- go back to setup menu -->
                        <a v-link="{name: 'setup'}" class="button is-outlined is-info">
                            <span class="icon is-small">
                                <i class="fa fa-arrow-left"></i>
                            </span>
                        </a>

                    </div>
                    <div class="level-item">
                        <h5 class="subtitle is-5">Liste des pieces.</h5>
                    </div>
                </div>
            </div>

            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>

                            <button v-link="{name: 'setup_room_create'}" class="button is-outlined is-success is-pulled-right">
                                Ajouter une piece
                            </button>  

                        </th>
                    </tr>
                </thead>
                <tbody>

                    <!-- each room -->
                    <tr v-for="room in rooms">

                        <!-- name -->
                        <td>{{room.name}}</td>

                        <!-- controls -->
                        <td>

                            <div class="field is-grouped is-pulled-right">
                                <p class="control">

                                    <!-- edit transmitter -->
                                    <button class="button is-outlined is-warning" disabled>Editer</button>
                                    
                                </p>
                                <p class="control">

                                    <!-- delete transmitter -->
                                    <button class="button is-outlined is-danger" disabled>Supprimer</button>

                                </p>
                            </div>

                        </td>

                    </tr>

                </tbody>
            </table>

        </div>
    </div>

</template>

<script>

    // services
    import { roomService } from 'services';

    export default {

        data() {
            return {

                // contain the listing of available rooms
                // @type {Array}
                'rooms': false

            }
        },

        created() {
            this.findRooms();
        },

        methods: {

            /**
             * find the listing of available (created) rooms
             * 
             * @author shad
             */ 
            findRooms() {

                roomService.find()
                .then( rooms => this.rooms = rooms )
                .catch( this.handlingErrors );

            }

        }
    
    }
    
</script>

<style lang="scss" scoped>

    .table {
        background: transparent;
    }

</style>


