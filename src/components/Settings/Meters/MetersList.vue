<template>
	<div class="ui one column padded grid">
	
		<div class="column">
	
			<h2 class="ui blue light header">
				<i class="circle icon"></i>
				Listes des Compteurs
			</h2>
	
		</div>
	
		<div class="column">
	
			<table class="ui selectable table">
				
				<thead>
					<tr>
						<th>ID</th>
						<th>Type</th>
						<th>Nom</th>
						<th>Connection</th>
						<th>Piece</th>
						<th class="collapsing">
	
							<div class="ui floating dropdown labeled basic green icon fluid button">
								<i class="plus icon"></i>
								<span class="text">Ajouter une Jauge</span>
								<div class="menu">
	
									<!-- add a power gauge -->
									<div v-link="{name: 'meter_form', query: {type: 'energy'}}" class="item">
										Puissance
									</div>
	
									<!-- add a water gauge -->
									<div v-link="{name: 'meter_form', query: {type: 'water'}}" class="item">
										Eau
									</div>
	
								</div>
							</div>
	
						</th>
					</tr>
				</thead>

				<tbody>
	
					<!-- each gauges meter -->
					<tr v-for="hardware in hardwares">
	
						<!-- identifier -->
						<td>{{hardware.identifier}}</td>
	
						<!-- type -->
						<td>{{hardware.type}}</td>
	
						<!-- name -->
						<td>{{hardware.name}}</td>
	
						<!-- port name -->
						<td></td>
	
						<!-- room_name -->
						<td></td>
	
						<td class="single line">
	
							<!-- meter informations -->
							<a v-link="" class="ui blue basic button disabled">Informations</a>
	
							<!-- meter edit -->
							<a v-link="" class="ui orange basic button disabled">Modifier</a>
	
						</td>
	
					</tr>
	
				</tbody>

			</table>
	
		</div>
	
	</div>
</template>

<script type="text/babel">

	// services
	import { hardwareService } from 'services';

	export default {

		data() {
			return {

				// contain the listing of meters hardware registered
				// @type {Array}
				'hardwares': []

			}
		},

		route: {

			data() {
				return this.findGaugesHardwareListing();
			}

		},

		ready() {
			$( '.dropdown', this.$el ).dropdown();
		},

		methods: {

			/**
			 * find meters hardware listing
			 *
			 * @return {Promise}
			 *
			 * @author shad
			 */
			findGaugesHardwareListing() {

				const query = {
					query: {

						// can either be an energy or water meter
						$or: [
							{ type: 'energy' },
							{ type: 'water' }
						]

					}
				};

				return hardwareService.find( query )
				.then( hardwares => ( { hardwares } ) )
				.catch( this.handlingErrors );

			}

		}
	}

</script>
