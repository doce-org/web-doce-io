<template>

	<div class="ui one column padded grid">

		<div class="column">

			<!-- edit mode -->
			<h2 v-if="port_id" class="ui orange light header">
				<i class="write icon"></i>
				Modifier le materiel
			</h2>

			<!-- create mode -->
			<h2 v-else class="ui green light header">
				<i class="plus icon"></i>
				Enregistrer un nouveau materiel
			</h2>

		</div>

		<div class="column">
			<form v-on:submit.prevent="save" class="ui form">

				<!-- sensor type -->
				<div class="fields">
					<div class="field disabled">
						<label>Type</label>
						<input v-bind:value="hardware.type" type="text" readonly>
					</div>
				</div>

				<div class="fields">

					<!-- name -->
					<div class="field required">
						<label>Nom</label>
						<input v-model="hardware.name" type="text" placeholder="Nom de la sonde">
					</div>

					<!-- id -->
					<div class="field required">
						<label>ID de la sonde</label>
						<input v-model="hardware.identifier" type="text" placeholder="ID en 24 caracteres...">
					</div>

				</div>

				<!-- linked room -->
				<div class="field required">
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

				<div class="ui divider"></div>

				<!-- edit mode -->
		        <button v-if="hardware_id" class="ui orange basic button" type="submit">
					<i class="write icon"></i>
					Sauvegarder
				</button>

				<!-- create mode -->
		        <button v-else class="ui green basic button" type="submit">
					<i class="plus icon"></i>
					Creer
				</button>

				<!-- cancel -->
		        <a v-link="{name: 'hardwares_list'}" class="ui red basic button">
					Annuler
				</a>

		    </form>
		</div>

	</div>

</template>

<script type="text/babel">

	// services
    import { roomService, hardwareService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of registered rooms
				// @type {Array}
                'rooms': [],

				// contain the hardware id
				// @type {Integer}
				'hardware_id': false,

				// contain the hardware object
				// @type {Object}
                'hardware': {}

            }
        },

		route: {

			data() {
				this.$set( 'hardware.type', this.$route.query[ 'type' ] );

				return Promise.all( [
					this.findRoomsListing()
				] )
				.then( rooms => ( { rooms } ) )
				.catch( this.handlingErrors );
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
                .catch( this.handlingErrors );

            },

            /**
             * create or update a sensor
             *
             * @author shad
             */
            save() {

                hardwareService.create( this.hardware )
                .then( () => this.$router.go( { name: 'sensors_list' } ) )
                .catch( this.handlingErrors );

            }

        }
    }

</script>
