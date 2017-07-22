<template>

    <table class="ui table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>

                    <button v-link="{name: 'setup_room_create'}" class="ui basic green button">
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
                    <button class="ui basic orange button disabled">Editer</button>
                </td>

            </tr>

        </tbody>
     </table>
  

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

