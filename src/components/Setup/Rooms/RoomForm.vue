<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-4">

            <form v-on:submit.prevent="save" class="ui form">

                <div class="field">
                    <label class="label">Nom</label>
                    <div class="control">
                        <input v-model="room.name" class="input" type="text" placeholder="Nom de la piece...">
                    </div>
                </div>

                <button type="submit" class="button is-success">Sauvegarder</button>

            </form>


        </div>
    </div>
  

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

