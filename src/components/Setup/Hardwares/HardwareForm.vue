<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-4">

            <h4 class="subtitle is-4">Creation / Edition d'un materiel.</h4>

            <form v-on:submit.prevent="save">

				<!-- name -->
                <div class="field">
                    <label class="label">Nom</label>
                    <div class="control">
                        <input v-model="hardware.name" class="input" type="text" placeholder="Nom du materiel...">
                    </div>
                </div>

				<!-- available setup hardware -->
				<div class="field">
					<label class="label">Materiel</label>
					<div class="select">
					  	<select v-model="hardware.identifier">

							<!-- each hardware ready to be registered -->
					    	<option v-for="hardware_setup in hardwares_setup"
					    		v-bind:value="hardware_setup.identifier">
								{{hardware_setup.type}} - {{hardware_setup.identifier}}
					    	</option>

					  	</select>
					</div>
				</div>

                <button v-bind:disabled="hardwares_setup.length === 0" type="submit" class="button is-outlined is-success">Sauvegarder</button>
                <button v-link="{name: 'setup_hardwares_listing'}" type="button" class="button is-outlined is-danger">Annuler</button>

            </form>

        </div>
    </div>

</template>

<script>

    // lib
    import _find from 'lodash/find';
    // services
    import { hardwareService, hardwareSetupService } from 'services';

    export default {

        data() {
            return {

                // contain the hardware id in edit mode
                // @type {Integer}
                'hardware_id': false,

                // contain the hardware currently in standby
                // to be registered
                // @type {Array}
                'hardwares_setup': false,

                // contain the hardware object
                // @type {Object}
                'hardware': {}

            }
        },

        created() {
            this.findHardwaresReadyForRegistering();
        },

        route: {

            data() {
                this.hardware_id = this.$route.params[ 'hardwareid' ];
				this.hardware.room_id = this.$route.params[ 'roomid' ];
                if ( this.hardware_id ) return this.getHardware();
            }

        },

        methods: {

            /**
             * find the current hardware in standby waiting to be registered
             *
             * @author shad
             */
            findHardwaresReadyForRegistering() {

                hardwareSetupService.find()
                .then( hardwares => this.hardwares_setup = hardwares )
                .catch( this.handlingErrors );

            },

            /**
             * get the hardware by id in edit mode
             *
             * @return {Promise}
             *
             * @author shad
             */
            getHardware() {

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

				// obtain all required data
				const hardware_setup = _find( this.hardwares_setup, { identifier: this.hardware.identifier } );

				if ( hardware_setup ) {

					// set the required hardware type
					this.hardware.type = hardware_setup.type;

					hardwareService.create( this.hardware )
					.then( () => this.$router.go( { name: 'setup_hardwares_listing' } ) )
					.catch( this.handlingErrors );

				}

            },

            createTransmitter() {

            },

            patchTransmitter() {

            }

        }

    }

</script>
