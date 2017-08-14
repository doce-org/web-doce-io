<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-4">

            <h4 class="subtitle is-4">Creation / Edition d'un transmetteur.</h4>

            <form v-on:submit.prevent="save">

                <div class="field">
                    <label class="label">Nom</label>
                    <div class="control">
                        <input v-model="hardware.name" class="input" type="text" placeholder="Nom du transmetteur...">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Transmetteur disponible</label>
                    <div class="control">
                        <div class="select">
                        <select v-model="hardware.identifier">
                            <option v-for="hardware in ready_registering_hardwares" v-bind:value="hardware.identifier">
                                {{hardware.identifier}} - {{hardware.type}}
                            </option>
                        </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Pieces disponible</label>
                    <div class="control">
                        <div class="select">
                        <select v-model="hardware.room_id">
                            <option v-for="room in rooms" v-bind:value="room.id">
                                {{room.name}}
                            </option>
                        </select>
                        </div>
                    </div>
                </div>

                <button type="submit" class="button is-outlined is-success">Sauvegarder</button>
                <button v-link="{name: 'setup_hardwares_listing'}" type="button" class="button is-outlined is-danger">Annuler</button>

            </form>

        </div>
    </div>

</template>

<script>

    // lib
    import _find from 'lodash/find';
    // services
    import { hardwareService, hardwareSetupService, roomService } from 'services';

    export default {

        data() {
            return {

                // contain the hardware id in edit mode
                // @type {Integer}
                'hardware_id': false,

                // contain the listing of ready to be registered
                // hardwares from the serial port conn.
                // @type {Array}
                'ready_registering_hardwares': false,

                // contain the listing of available rooms
                // @type {Array}
                'rooms': false,

                // contain the hardware object
                // @type {Object}
                'hardware': {}

            }
        },

        created() {
            this.findHardwaresReadyForRegistering();
            this.findRooms();
        },

        route: {

            data() {
                this.hardware_id = this.$route.params[ 'hardware_id' ];
                if ( this.hardware_id ) return this.getTransmitter();
            }

        },

        methods: {

            /**
             * find the listing of ready to be registered hardwares
             *
             * @author shad
             */
            findHardwaresReadyForRegistering() {

                hardwareSetupService.find()
                .then( hardwares => this.ready_registering_hardwares = hardwares )
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
             * get the hardware by id in edit mode
             *
             * @return {Promise}
             *
             * @author shad
             */
            getTransmitter() {

                return hardwareService.get( this.hardware_id )
                .then( hardware => ( { hardware } ) )
                .catch( this.handlingErrors );

            },

            /**
             * save the current hardware by either creating or patching it
             *
             * @author shad
             */
            save() {

                const hardware_selected = _find( this.ready_registering_hardwares, { identifier: this.hardware.identifier } );

                this.hardware.type = hardware_selected.type;

                hardwareService.create( this.hardware )
                .then( () => this.$router.go( { name: 'setup_hardwares_listing' } ) )
                .catch( this.handlingErrors );

            },

            createTransmitter() {

            },

            patchTransmitter() {

            }

        }

    }

</script>
