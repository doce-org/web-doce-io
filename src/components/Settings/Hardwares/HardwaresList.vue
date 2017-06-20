<template>

	<div class="ui one column padded grid">
	
		<div class="column">
	
			<h2 class="ui blue light header">
					<i class="circle icon"></i>
					Listes des materiels
				</h2>
	
		</div>
	
		<div class="column">
	
			<table class="ui selectable table">

				<thead>
					<tr>
						<th>ID</th>
						<th>Type</th>
						<th>Nom</th>
						<th>Piece</th>
						<th class="collapsing">
	
							<div class="ui floating dropdown labeled basic green icon fluid button">
								<i class="plus icon"></i>
								<span class="text">Ajouter une sonde</span>
								<div class="menu">
	
									<!-- add a temperature sensor -->
									<div v-link="{name: 'hardware_form', query: {type: 'temperature'}}" class="item">
										Temperature
									</div>
	
									<!-- add a humidity sensor -->
									<div v-link="{name: 'hardware_form', query: {type: 'humidity'}}" class="item">
										Humidite
									</div>

									<!-- add a power gauge -->
									<div v-link="{name: 'hardware_form', query: {type: 'energy'}}" class="item">
										Puissance
									</div>
	
									<!-- add a water gauge -->
									<div v-link="{name: 'hardware_form', query: {type: 'water'}}" class="item">
										Eau
									</div>
	
								</div>
							</div>
	
						</th>
					</tr>
				</thead>

				<tbody>
	
					<!-- each temperature sensor -->
					<tr v-for="hardware in hardwares">
	
						<!-- identifier -->
						<td>{{hardware.identifier}}</td>
	
						<!-- type -->
						<td>{{hardware.type}}</td>
	
						<!-- name -->
						<td>{{hardware.name}}</td>
	
						<!-- room_name -->
						<td></td>
	
						<td class="single line">
	
							<!-- sensor informations -->
							<a v-link="" class="ui blue basic button disabled">Informations</a>
	
							<!--sensor edit -->
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

				// contain the listing of sensors hardware registered
				// @type {Array}
				'hardwares': []

			}
		},

		route: {

			data() {
				return this.findHardwaresListing();
			}

		},

		ready() {
			$('.dropdown', this.$el).dropdown();
		},

		methods: {

			/**
			 * find hardwares listing
			 *
			 * @return {Promise}
			 *
			 * @author shad
			 */
			findHardwaresListing() {

				return hardwareService.find( {} )
				.then( hardwares => ( { hardwares } ) )
				.catch( this.handlingErrors );

			}

		}
	}

</script>
