<template>
  
    <form v-on:submit.prevent="save" class="ui form">

        <div class="fields">

            <div class="required field">
                <label>Nom</label>
                <input v-model="room.name" type="text">
            </div>

        </div>

        <button type="submit" class="ui basic orange button">Sauvegarder</button>

    </form>

</template>

<script>

    // services
    import { roomService } from 'services';

    export default {

        data() {
            return {

                // contain the room id in edit mode
                // @type {Integer}
                'room_id': false,

                // contain the room object
                // @type {Object}
                'room': {}

            }
        },

        route: {

            data() {
                this.room_id = this.$route.params[ 'room_id' ];
                if ( this.room_id ) return this.getRoom();
            }

        },

        methods: {

            /**
             * get the room by id in edit mode
             * 
             * @return {Promise}
             * 
             * @author shad
             */ 
            getRoom() {

                return roomService.get( this.room_id )
                .then( room => ( { room } ) )
                .catch( this.handlingErrors );

            },

            save() {

                roomService.create( this.room )
                .then( () => this.$router.go( { name: 'setup_rooms_listing' } ) )
                .catch( this.handlingErrors );

            },

            createRoom() {

            },

            patchRoom() {

            }

        }
    
    }

</script>

