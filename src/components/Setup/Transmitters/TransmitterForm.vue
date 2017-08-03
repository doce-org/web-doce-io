<template>
  
    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-4">

            <form v-on:submit.prevent="save">

                <div class="field">
                    <label class="label">Nom</label>
                    <div class="control">
                        <input v-model="transmitter.name" class="input" type="text" placeholder="Nom du transmetteur...">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Transmetteur disponible</label>
                    <div class="control">
                        <div class="select">
                        <select v-model="transmitter.identifier">
                            <option v-for="transmitter in ready_registering_transmitters" v-bind:value="transmitter.identifier">
                                {{transmitter.identifier}} - {{transmitter.type}}
                            </option>
                        </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Pieces disponible</label>
                    <div class="control">
                        <div class="select">
                        <select>
                            <option v-for="room in rooms" v-bind:value="room.id">
                                {{room.name}}
                            </option>
                        </select>
                        </div>
                    </div>
                </div>

                <button type="submit" class="button is-success">Sauvegarder</button>

            </form>

        </div>
    </div>

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

