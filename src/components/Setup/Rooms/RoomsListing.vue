<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column">

            <table class="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>

                            <button v-link="{name: 'setup_room_create'}" class="button is-success">
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
                            <button class="button is-warning" disabled>Editer</button>
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
        margin-left: auto;
        margin-right: auto;
    }

</style>


