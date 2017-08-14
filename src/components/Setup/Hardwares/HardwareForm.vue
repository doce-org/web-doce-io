<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-4">

            <h4 class="subtitle is-4">Creation / Edition d'un materiel.</h4>

            <form v-on:submit.prevent="save">

				<!-- waiting hardware type -->
				<div class="box">
					<p>Type de materiel en attente: {{hardware_in_standby && hardware_in_standby.type || 'Indisponible'}}</p>
				</div>

				<!-- name -->
                <div class="field">
                    <label class="label">Nom</label>
                    <div class="control">
                        <input v-model="hardware.name" class="input" type="text" placeholder="Nom du materiel...">
                    </div>
                </div>

				<!-- can be used as relay -->
				<div class="field">
					<label class="checkbox">
						<input type="checkbox">
						Est un relais ?
					</label>
				</div>

                <button v-bind:disabled="!hardware_in_standby" type="submit" class="button is-outlined is-success">Sauvegarder</button>
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
                'hardware_in_standby': false,

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
                this.hardware_id = this.$route.params[ 'hardware_id' ];
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
                .then( hardwares => this.hardware_in_standby = hardwares && hardwares[ 0 ] )
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
