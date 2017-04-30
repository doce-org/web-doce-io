<template>

	<div class="ui one column padded grid">
	
		<div class="column">
	
			<h2 class="ui blue light header">
				<i class="circle icon"></i>
				Listes des Ports
			</h2>
	
		</div>
	
		<div class="column">

			<table class="ui selectable table">
	
				<thead>
					<tr>
						<th>Nom</th>
						<th>Connexion</th>
						<th>Constructeur</th>
						<th>Numero de Serie</th>
						<th class="collapsing">
	
							<!-- add a new port -->
							<a v-link="{name: 'port_add'}" class="ui green basic fluid button">
								<i class="plus icon"></i> Enregistrer un nouveau port
							</a>
	
						</th>
					</tr>
				</thead>
	
				<tbody>
	
					<!-- each port -->
					<tr v-for="port in ports">
	
						<!-- name -->
						<td>{{port.name}}</td>
	
						<!-- com name -->
						<td>{{port.com_name}}</td>
	
						<!-- manufacturer -->
						<td>{{port.manufacturer}}</td>
	
						<!-- serial number -->
						<td>{{port.serial_number}}</td>
	
						<td class="single line">
	
							<!-- open connection -->
							<button v-on:click="openConnection(port)" class="ui green basic button" type="button">
								Ouvrir la connexion
							</button>
	
							<!-- edit port -->
							<button class="ui orange basic button disabled" type="button">
								<i class="write icon"></i> Editer
							</button>
	
						</td>
	
					</tr>
	
				</tbody>

			</table>

		</div>
	
	</div>

</template>

<script>

	// services
	import { portService, connectionService } from 'services';

	export default {

		data() {
			return {

				// contain the registered ports listing
				// @type {Array}
				'ports': false

			}
		},

		route: {

			data() {
				return this.findRegisteredPorts();
			}

		},

		methods: {

			/**
			 * find the listing of registered ports server side
			 *
			 * @return {Promise}
			 *
			 * @author shad
			 */
			findRegisteredPorts() {

				return portService.find()
				.then( ports => ( { ports } ) )
				.catch( this.handlingErrors );

			},

			/**
			 * open the selected port connection
			 *
			 * @param {Object} port
			 *
			 * @author shad
			 */
			openConnection( port ) {

				connectionService.create( port )
				.catch( this.handlingErrors );

			}

		}

	}

</script>
