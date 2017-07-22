<template>
  
    <form v-on:submit.prevent="save" class="ui form">

        <div class="fields">

            <div class="required field">
                <label>Nom</label>
                <input v-model="transmitter.name" type="text">
            </div>

        </div>

        <div class="fields">

            <div class="ui selection dropdown">
                <input v-model="transmitter.identifier" type="hidden">
                <i class="dropdown icon"></i>
                <div class="default text">Transmetteurs Disponibles</div>
                <div class="menu">
                    <div v-for="transmitter in ready_registering_transmitters" class="item" data-value="{{transmitter.identifier}}">
                        {{transmitter.identifier}}
                        {{transmitter.type}}
                    </div>
                </div>
            </div>

        </div>

        <div class="fields">

            <div class="ui selection dropdown">
                <input v-model="transmitter.room_id" type="hidden">
                <i class="dropdown icon"></i>
                <div class="default text">Pieces Disponibles</div>
                <div class="menu">
                    <div v-for="room in rooms" class="item" data-value="{{room.id}}">
                        {{room.name}}
                    </div>
                </div>
            </div>

        </div>

        <button type="submit" class="ui basic orange button">Sauvegarder</button>

    </form>

</template>

<script>

    // lib
    import _find from 'lodash/find';
    // services
    import { transmitterService, transmitterSetupService, roomService } from 'services';

    export default {

        data() {
            return {

                // contain the transmitter id in edit mode
                // @type {Integer}
                'transmitter_id': false,

                // contain the listing of ready to be registered
                // transmitters from the serial port conn.
                // @type {Array}
                'ready_registering_transmitters': false,

                // contain the listing of available rooms
                // @type {Array}
                'rooms': false,

                // contain the transmitter object
                // @type {Object}
                'transmitter': {}

            }
        },

        created() {
            this.findTransmittersReadyForRegistering();
            this.findRooms();
        },

        ready() {
            $( '.ui.dropdown', this.$el ).dropdown();
        },

        route: {

            data() {
                this.transmitter_id = this.$route.params[ 'transmitter_id' ];
                if ( this.transmitter_id ) return this.getTransmitter();
            }

        },

        methods: {

            /**
             * find the listing of ready to be registered transmitters
             * 
             * @author shad
             */
            findTransmittersReadyForRegistering() {

                transmitterSetupService.find()
                .then( transmitters => this.ready_registering_transmitters = transmitters )
                .catch( this.handlingErrors );

            },

            /**
             * find available rooms listing
             * 
             * @author shad
             */
            findRooms() {

                roomService.find()
                .then( rooms => this.rooms = rooms )
                .catch( this.handlingErrors );

            },

            /**
             * get the transmitter by id in edit mode
             * 
             * @return {Promise}
             * 
             * @author shad
             */ 
            getTransmitter() {

                return transmitterService.get( this.transmitter_id )
                .then( transmitter => ( { transmitter } ) )
                .catch( this.handlingErrors );

            },

            /**
             * save the current transmitter by either creating or patching it
             * 
             * @author shad
             */
            save() {

                const transmitter_selected = _find( this.ready_registering_transmitters, { identifier: this.transmitter.identifier } );

                this.transmitter.type = transmitter_selected.type;

                transmitterService.create( this.transmitter )
                .then( () => this.$router.go( { name: 'setup_transmitters_listing' } ) )
                .catch( this.handlingErrors );

            },

            createTransmitter() {

            },

            patchTransmitter() {

            }

        }
    
    }

</script>

