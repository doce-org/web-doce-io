<template>

	<div class="ui segment">

		<nav class="ui secondary menu">
			<div class="header item">Comparaison Humidites / Temperatures</div>
			<div class="right menu">
				<a @click="switchMode('day')" v-bind:class="{'active': this.current_mode === 'day'}" class="ui item">Jour</a>
				<a @click="switchMode('month')" v-bind:class="{'active': this.current_mode === 'month'}" class="ui item">Mois</a>
				<a @click="switchMode('year')" v-bind:class="{'active': this.current_mode === 'year'}" class="ui item">Annee</a>
			</div>
		</nav>
		<div class="ui divider"></div>

		<canvas id="humidity-chart"></canvas>

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
				'date_end': false,

				// contain the current graph mode
				// @type {String}
				'current_mode': 'day'

			}
		},

		ready() {
			// set default date to the currently last 24 hours
			this.date_end = moment().endOf( 'day' ).toDate();
			this.date_start = moment().startOf( 'day' ).toDate();

			this.findSensorData();

			// TODO handle empty data chart
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
			 * find the humidity sensors records
			 *
			 * @author shad
			 */
			findSensorData() {

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

				hardwareHumidityView.find( query )
				.then( records => this.records = records )
				.catch( this.handlingErrors );

			},

			/**
			 * switch the current date range mode between:
			 * 'day', 'month' & 'year'
			 *
			 * @param  {String} mode
			 *
			 * @author shad
			 */
			switchMode( mode ) {

				// prevent switching to same mode
				if( this.current_mode === mode ) {
					return;
				}

				// prepare new date ranges
				this.date_start = moment().startOf( mode ).toDate();
				this.date_end = moment().endOf( mode ).toDate();

				// switch menu mode
				this.current_mode = mode;

				// find the newly requested sensor data
				this.findSensorData();

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

						// hardware labels
						labels: this.sorted_by_hardwares[ 0 ].labels,

						datasets: [
							{

								// single hardware label (temperature)
								label: `${this.sorted_by_hardwares[ 0 ].name}-Temperatures`,

								// y axis ID (multiple axis)
								yAxisID: 'y-axis-0',

								// line stroke color
								borderColor: '#e74c3c',

								// line stroke width
								borderWidth: 1,

								// prevent fill for better readability
								fill: false,

								// temperature array of values
								data: this.sorted_by_hardwares[ 0 ].temperatures

							},
							{

								// single hardware label (humidity)
								label: `${this.sorted_by_hardwares[ 0 ].name}-Humidites`,

								// y axis ID (multiple axis)
								yAxisID: 'y-axis-1',

								// line stroke color
								borderColor: '#3498db',

								// line stroke width
								borderWidth: 1,

								// prevent fill for better readability
								fill: false,

								// humidity array of values
								data: this.sorted_by_hardwares[ 0 ].humidities

							}
						]

					},

					options: {

						scales: {

							// time axis
							xAxes: [
								{

									// specify type 'time'
									type: 'time',

									// time options
									time: {

										// prevent formatting
										format: false,

										// prevent a specific unit
										unit: false,

										// moment format for diverse given data
										displayFormats: {
											'hour': 'HH:mm'
										},

										// min date
										min: this.date_start,

										// max date
										max: this.date_end,

										// moment format on tooltip
										tooltipFormat: 'HH:mm'

									}
								}
							],

							// double humidity and temperature Y axis
							yAxes: [

								{
									// left axis (temperature)
									position: 'left',

									// id corresponding
									id: 'y-axis-0',

									ticks: {

										// 0 as min value
										min: 0,

										// 45 as max value
										max: 45

									},

									gridLines: {

										// don't show the grid lines
										display: false

									}

								},

								{

									// right axis (humidity)
									position: 'right',

									// id corresponding
									id: 'y-axis-1',

									ticks: {

										// 0 as min value
										min: 0,

										// 100 as max value
										max: 100

									},

									gridLines: {

										// don't show the grid lines
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
