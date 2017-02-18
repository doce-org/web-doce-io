<template>

	<div class="ui padded grid">

		<div class="sixteen wide column">

			<!-- edit mode -->
			<h2 v-if="port_id" class="ui orange light header">
				<i class="write icon"></i>
				Modifier le port
			</h2>

			<!-- create mode -->
			<h2 v-else class="ui green light header">
				<i class="plus icon"></i>
				Enregistrer un nouveau port
			</h2>

		</div>

		<div class="sixteen wide column">
			<form v-on:submit.prevent="save" class="ui form">

				<div class="ui grid">

					<div class="four wide column">

						<!-- name -->
						<div class="field required">
							<label>Nom</label>
							<input v-model="port.name" type="text">
						</div>

						<!-- com name -->
						<div class="field required">
							<label>Connexion</label>
							<input v-model="port.com_name" type="text" readonly disabled>
						</div>

						<!-- manufacturer -->
						<div class="field">
							<label>Fabricant</label>
							<input v-model="port.manufacturer" type="text" readonly disabled>
						</div>

						<!-- serial number -->
						<div class="field">
							<label>Numero de Serie</label>
							<input v-model="port.serial_number" type="text" readonly disabled>
						</div>

					</div>

					<div class="six wide column">

						<div class="ui basic segment ports">

							<!-- each found port -->
							<table class="ui table">
								<thead>
									<tr>
										<th>

											<button v-on:click="listAvailablePorts" class="ui orange basic button disabled" type="button">
												Recharger la liste
											</button>

										</th>
										<th>Connection</th>
										<th>Fabricant</th>
										<th>Numero de Serie</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="port in ports">

										<td>
											<button v-on:click="selectPort(port)" class="ui small green basic button" type="button">
												<i class="plus icon"></i>
												Selectionner
											</button>
										</td>

										<!-- com name -->
										<td v-if="port">
											{{port.comName}}
										</td>

										<!-- manufacturer -->
										<td v-if="port">
											{{port.manufacturer}}
										</td>

										<!-- serial number -->
										<td v-if="port">
											{{port.serialNumber}}
										</td>

									</tr>
								</tbody>
							</table>

						</div>

					</div>

				</div>

				<div class="ui divider"></div>

				<!-- edit mode -->
				<button v-if="" type="submit" class="ui orange basic button">
					<i class="write icon"></i>
					Sauvegarder
				</button>

				<!-- create mode -->
				<button type="submit" class="ui green basic button">
					<i class="plus icon"></i>
					Sauvegarder
				</button>

				<!-- cancel -->
				<button v-link="{name: 'ports_list'}" type="button" class="ui red basic button">
					Annuler
				</button>

		    </form>
		</div>

	</div>

</template>

<script>

	// services
	import { portListService, portService } from 'services';

	export default {

		data() {
			return {

				// contain the port id
				// @type {Integer}
				'port_id': false,

				// contain the port object
				// @type {Object}
				'port': {},

				// contain the list of available ports
				// @type {Array}
				'ports': false

			}
		},

		route: {

			data() {
				return this.listAvailablePorts();
			}

		},

		methods: {

			/**
			 * list all available ports
			 *
			 * @return Promise
			 *
			 * @author shad
			 */
			listAvailablePorts() {

				return portListService.find()
				.then( ports => ( { ports } ) )
				.catch( this.handlingErrors );

			},

			/**
			 * when selecting a port, set the form data to the proper values
			 *
			 * @param {Object} port
			 *
			 * @author shad
			 */
			selectPort( port ) {

				this.$set( 'port.com_name', port.comName );
				this.$set( 'port.manufacturer', port.manufacturer );
				this.$set( 'port.serial_number', port.serialNumber );

			},

			/**
			 * save the form data on the server
			 *
			 * @author shad
			 */
			save() {

				portService.create( this.port )
				.then( () => this.$router.go( { name: 'ports_list' } ) )
				.catch( this.handlingErrors );

			}

		}

	}

</script>

<style lang="scss" scoped>

	// listing of ports
	.segment.ports {
		height: 300px;
		overflow: auto;
	}

</style>
