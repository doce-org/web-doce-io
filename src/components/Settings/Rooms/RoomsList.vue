<template>

    <table class="ui very basic selectable table">

        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Image</th>
                <th class="collapsing">
                    <a v-link="{name: 'room_add'}" class="ui green basic button">Ajouter une pièce</a>
                </th>
            </tr>
        </thead>

        <tbody>

            <tr v-for="room in rooms">
                <td>{{room.id}}</td>
                <td>{{room.name}}</td>
                <td>
                    <img class="ui tiny image" v-bind:src="room.room_icon.image" alt="room icon">
                </td>
                <td class="single line">
                    <a v-link="" class="ui blue basic button disabled">Informations</a>
                    <a v-link="" class="ui orange basic button disabled">Modifier</a>
                </td>
            </tr>

        </tbody>
    </table>

</template>

<script type="text/babel">

    import { roomService } from 'services';

    export default {

        data() {
            return {
                rooms: []
            }
        },

        created(){
            this.getRooms();
        },

        methods: {

            /**
             * get rooms listing
             * @author shad
             */
            getRooms() {
                roomService.find()
                    .then( rooms => this.rooms = rooms )
                    .catch( console.error )
            }

        }
    }

</script>