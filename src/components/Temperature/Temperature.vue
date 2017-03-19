<template>

	<div id="humidity" class="ui equal height padded grid">

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

			<canvas id="humidity-chart"></canvas>

		</section>

		<section class="three wide stretched column" style="background: #eff2f8;">
			<div class="ui equal height grid"></div>
		</section>

	</div>

</template>

<script type="text/babel">

	// lib
	import moment from 'moment';
	import Chart from 'chart.js';
	import _pick from 'lodash/pick';
	import _filter from 'lodash/filter';
	import _uniq from 'lodash/uniq';
	import _map from 'lodash/map';
	// services
	import { hardwareHumidityView } from 'services';

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
				this.date_end = moment().endOf( 'day' ).toDate();
				this.date_start = moment().startOf( 'day' ).toDate();

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
						let graph_humidities = [];
						let graph_temperatures = [];

						// filter to get only the humidities linked to the hardware selected
						const humidities = _filter( this.records, { name: hardware_name } );

						// convert to dates
						for( let d = 0; d < humidities.length; d++ ) {

							graph_labels.push( humidities[ d ][ 'sensor_created_at' ] );
							graph_humidities.push( +humidities[ d ][ 'sensor_humidity' ] );
							graph_temperatures.push( +humidities[ d ][ 'sensor_temperature' ] );

						}

						sorted_by_hardwares.push( {
							name: hardware_name,
							labels: graph_labels,
							humidities: graph_humidities,
							temperatures: graph_temperatures
						} );

					} );

				}

				return sorted_by_hardwares.length > 0 && sorted_by_hardwares;

			}

		},

		methods: {

			/**
			 * get the humidity sensors records
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
					$sort: { 'sensor_created_at': 1 }

				} };

				return hardwareHumidityView.find( query )
				.then( records => this.records = records )
				.catch( console.error );

			},

			/**
			 * update the chart with the given records
			 *
			 * @author shad
			 */
			updateChart() {

				const ctx = $( '#humidity-chart' );
				new Chart( ctx, {

					type: 'line',

					data: {

						labels: this.sorted_by_hardwares[ 0 ].labels,

						datasets: [
							{
								label: `${this.sorted_by_hardwares[ 0 ].name}-Temperatures`,
								yAxisID: 'y-axis-0',
								borderColor: '#e74c3c',
								borderWidth: 1,
								fill: false,
								data: this.sorted_by_hardwares[ 0 ].temperatures
							},
							{
								label: `${this.sorted_by_hardwares[ 0 ].name}-Humidites`,
								yAxisID: 'y-axis-1',
								borderColor: '#3498db',
								borderWidth: 1,
								fill: false,
								data: this.sorted_by_hardwares[ 0 ].humidities
							}
						]

					},

					options: {
						scales: {
							xAxes: [
								{
									type: 'time',
									time: {
										format: false,
										unit: false,
										displayFormats: {
											'millisecond': 'HH:mm:ss',
											'second': 'HH:mm:ss',
											'minute': 'HH:mm',
											'hour': 'HH:mm'
										},
										min: this.date_start,
										max: this.date_end,
										tooltipFormat: 'HH:mm'
									}
								}
							],
							yAxes: [
								{
									position: 'left',
									id: 'y-axis-0',
									ticks: {
										min: 0,
										max: 45
									},
									gridLines: {
										display: false
									}
								},
								{
									position: 'right',
									id: 'y-axis-1',
									ticks: {
										min: 0,
										max: 100
									},
									gridLines: {
										display: false
									}
								}
							]
						}
					}

				} );

			}

		}

	}

</script>

<style lang="scss">

	// humidity module styling
	#humidity {
		height: 100vh;

		& .column {
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

</style>
