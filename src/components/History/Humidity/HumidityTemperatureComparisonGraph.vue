<template>

	<div>

		<nav class="ui secondary menu">
			<div class="header item">Comparaison Humidites / Temperatures</div>
			<div class="right menu">
				<a @click="switchMode('day')" v-bind:class="{'active': this.current_mode === 'day'}" class="ui item">Jour</a>
				<a @click="switchMode('week')" v-bind:class="{'active': this.current_mode === 'week'}" class="ui item">Semaine</a>
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
	import _max from 'lodash/max';
	import _min from 'lodash/min';
	// services
	import { hardwareHumidityAvgDetailedView } from 'services';

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
			'sorted_by_transmitters'() {

				this.updateChart();

			}

		},

		computed: {

			/**
			 * filter a listing of unique transmitters names available
			 *
			 * @return {Array}
			 *
			 * @author shad
			 */
			transmitters_names() {

				return _uniq( _map( this.records, 'transmitter_name' ) );

			},

			/**
			 * prepare records listing
			 *
			 * @return {Array}
			 *
			 * @author shad
			 */
			sorted_by_transmitters() {

				let sorted_by_transmitters = [];

				if( this.records ) {

					this.transmitters_names.forEach( transmitter_name => {

						let graph_labels = [];
						let graph_humidities = [];
						let graph_temperatures = [];

						// filter to get only the humidities linked to the transmitter selected
						const humidities = _filter( this.records, { transmitter_name } );

						// convert to dates
						for( let d = 0; d < humidities.length; d++ ) {

							graph_labels.push( humidities[ d ][ 'created_at' ] );
							graph_humidities.push( +humidities[ d ][ 'avg_humidity' ] );
							graph_temperatures.push( +humidities[ d ][ 'avg_temperature' ] );

						}

						sorted_by_transmitters.push( {
							name: transmitter_name,
							labels: graph_labels,
							humidities: graph_humidities,
							temperatures: graph_temperatures
						} );

					} );

				}

				return sorted_by_transmitters.length > 0 && sorted_by_transmitters;

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

					// only get the data on the user specified mode
					// ex: 'day'
					'type': this.current_mode,

					// sensor record has to be between the range of
					// specified dates
					'created_at': {
						$gte: this.date_start,
						$lte: this.date_end
					},

					// sort so we only get the last ones
					$sort: { 'created_at': 1 }

				} };

				hardwareHumidityAvgDetailedView.find( query )
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

						// transmitter labels
						labels: this.sorted_by_transmitters[ 0 ].labels,

						datasets: [
							{

								// single transmitter label (temperature)
								label: `"${this.sorted_by_transmitters[ 0 ].name}" (Temperatures)`,

								// y axis ID (multiple axis)
								yAxisID: 'y-axis-0',

								// line stroke color
								borderColor: '#e74c3c',

								// line background color
								backgroundColor: '#e74c3c',

								// line stroke width
								borderWidth: 2,

								// point background color
								pointBackgroundColor: "#e74c2c",

								// point not shown unless hovered
								pointRadius: 0,

								// point border width
      							pointBorderWidth: 0,

								// straight lines
								lineTension: 0,

								// prevent fill for better readability
								fill: false,

								// temperature array of values
								data: this.sorted_by_transmitters[ 0 ].temperatures

							},
							{

								// single transmitter label (humidity)
								label: `"${this.sorted_by_transmitters[ 0 ].name}"(Humidites)`,

								// y axis ID (multiple axis)
								yAxisID: 'y-axis-1',

								// line stroke color
								borderColor: '#3498db',

								// line background color
								backgroundColor: '#3498db',

								// line stroke width
								borderWidth: 2,

								// point background color
								pointBackgroundColor: "#3498db",

								// point not shown unless hovered
								pointRadius: 0,

								// point border width
      							pointBorderWidth: 0,

								// straight lines
								lineTension: 0,

								// prevent fill for better readability
								fill: false,

								// humidity array of values
								data: this.sorted_by_transmitters[ 0 ].humidities

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
										min: _min( this.sorted_by_transmitters[ 0 ].temperatures ) - 1,

										// 45 as max value
										max: _max( this.sorted_by_transmitters[ 0 ].temperatures ) + 1

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
										min: _min( this.sorted_by_transmitters[ 0 ].humidities ) - 1,

										// 100 as max value
										max: _max( this.sorted_by_transmitters[ 0 ].humidities ) + 1

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

<style lang="scss" scoped>

	// some nav selector style
	.ui.secondary.menu {
		margin-top: 0;
	}

</style>

