<template>

    <form v-on:submit.prevent="save" class="ui form">

        <!-- name -->
        <div class="field">
            <label>Nom</label>
            <input v-model="hardware.name" type="text" placeholder="Nom de la sonde">
        </div>

        <!-- id -->
        <div class="field">
            <label>ID de la sonde</label>
            <input v-model="hardware.identifier" type="text" placeholder="ID en 24 caracteres...">
        </div>

		<!-- rooms -->
        <div class="field">
            <label>Pièce</label>
            <div class="ui selection search dropdown">
                <input v-model="hardware.room_id" type="hidden">
                <div class="default text">Appartient a la pièce...</div>
                <i class="dropdown icon"></i>
                <div class="menu">

					<!-- each room -->
                    <div v-for="room in rooms" class="item" data-value="{{room.id}}">
						{{room.name}}
					</div>

                </div>
            </div>
        </div>

        <!-- port -->
        <div class="field">
            <label>Connection</label>
            <div class="ui selection search dropdown">
                <input v-model="hardware.port_id" type="hidden">
                <div class="default text">Selectionner une connection disponible</div>
                <i class="dropdown icon"></i>
                <div class="menu">

					<!-- each port -->
                    <div v-for="port in ports" class="item" data-value="{{port.id}}">
						{{port.name}}
					</div>

                </div>
            </div>
        </div>

		<!-- save -->
        <button class="ui orange basic button" type="submit">
			<i class="plus icon"></i>
			Sauvegarder
		</button>

		<!-- cancel -->
        <a v-link="{name: 'temperatures_sensors_list'}" class="ui red basic button">
			Annuler
		</a>

    </form>

</template>

<script type="text/babel">

	// services
    import { roomService, portService, hardwareService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of registered rooms
				// @type {Array}
                'rooms': [],

				// contain the listing of registered serial ports
				// @type {Array}
                'ports': [],

				// contain the hardware object
				// @type {Object}
                'hardware': {
					type: 'temperature'
				}

            }
        },

		route: {

			data() {
				return Promise.all( [
					this.findRoomsListing(),
					this.findPortsListing()
				] )
				.then( ( [ rooms, ports ] ) => ( { rooms, ports } ) )
				.catch( console.error );
			}

		},

        ready() {
            $( '.ui.dropdown', this.$el ).dropdown();
        },

        methods: {

            /**
             * find available rooms
             *
             * @return {Promise}
             *
             * @author shad
             */
            findRoomsListing() {

                return roomService.find()
                .catch( console.error );

            },

			/**
			 * find available ports
			 *
			 * @return {Promise}
			 *
			 * @author shad
			 */
			findPortsListing() {

				return portService.find()
				.catch( console.error );

			},

            /**
             * create or update a sensor
             *
             * @author shad
             */
            save() {

                hardwareService.create( this.hardware )
                .then( () => this.$router.go( { name: 'temperatures_sensors_list' } ) )
                .catch( console.error );

            }

        }
    }

</script>
