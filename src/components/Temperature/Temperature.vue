<template>

	<div id="temperature" class="ui equal height padded grid">

		<!-- summary -->
		<section class="thirteen wide center aligned column">
			<nav class="ui secondary menu">
				<div class="header item">Récapitulatif</div>
				<div class="right menu">
					<a class="ui item disabled">Jour</a>
					<a class="ui item disabled">Mois</a>
					<a class="ui item disabled">Annee</a>
				</div>
			</nav>
			<div class="ui divider"></div>

			<canvas id="temperature-chart"></canvas>

		</section>

		<section class="three wide stretched column" style="background: #eff2f8;">
			<div class="ui equal height grid"></div>
		</section>

	</div>

</template>

<script type="text/babel">

	// lib
	import moment from 'moment';
	import _pick from 'lodash/pick';
	import _filter from 'lodash/filter';
	import _uniq from 'lodash/uniq';
	import _map from 'lodash/map';
	// services
	import { hardwareTemperatureView } from 'services';

	export default {

		data() {
			return {

				// contain the records listing
				// @type {Array}
				'records': false,

				// contain the start date specified
				// @type {Date}
				'date_start': false,

				// contain the end date specified
				// @type {Date}
				'date_end': false

			}
		},

		route: {

			data() {
				// set default date to the currently last 24 hours
				this.date_end = moment().toDate();
				this.date_start = moment().subtract( 24, 'hours' ).toDate();

				return this.getSensorData();
			}

		},

		ready() {
			// this.makeEmptyChart();
		},

		watch: {

			/**
			 * redo the chart each time the records data changes
			 *
			 * @author shad
			 */
			'sorted_by_hardwares'() {

				this.updateChart();

			}

		},

		computed: {

			/**
			 * filter a listing of unique hardwares names available
			 *
			 * @return {Array}
			 *
			 * @author shad
			 */
			hardwares_names() {

				return _uniq( _map( this.records, 'name' ) );

			},

			/**
			 * prepare records listing
			 *
			 * @return {Array}
			 *
			 * @author shad
			 */
			sorted_by_hardwares() {

				let sorted_by_hardwares = [];

				if( this.records ) {

					this.hardwares_names.forEach( hardware_name => {

						let graph_labels = [];
						let graph_temperatures = [];

						// filter to get only the temperatures linked to the hardware selected
						const temperatures = _filter( this.records, { name: hardware_name } );

						// convert to dates
						for( let d = 0; d < temperatures.length; d++ ) {

							graph_labels.push( temperatures[ d ][ 'sensor_created_at' ] );
							graph_temperatures.push( +temperatures[ d ][ 'sensor_temperature' ] );

						}

						sorted_by_hardwares.push( {
							name: hardware_name,
							labels: graph_labels,
							values: graph_temperatures
						} );

					} );

				}

				return sorted_by_hardwares.length > 0 && sorted_by_hardwares;

			}

		},

		methods: {

			/**
			 * get the temperature sensors records
			 *
			 * @returns {Promise}
			 *
			 * @author shad
			 */
			getSensorData() {

				const query = { query: {

					// sensor record has to be between the range of
					// specified dates
					'sensor_created_at': {
						$gte: this.date_start,
						$lte: this.date_end
					},

					// sort so we only get the last ones
					$sort: { 'sensor_created_at': -1 }

				} };

				return hardwareTemperatureView.find( query )
				.then( records => this.records = records )
				.catch( console.error );

			},

			/**
			 * update the chart with the given records
			 *
			 * @author shad
			 */
			updateChart() {



			}

		}

	}

</script>

<style lang="scss">

	// temperature module styling
	#temperature {
		height: 100vh;

		& .column {
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

</style>
