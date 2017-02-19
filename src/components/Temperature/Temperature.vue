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

			<div id="temperature-chart"></div>

		</section>

		<section class="three wide stretched column" style="background: #eff2f8;">
			<div class="ui equal height grid"></div>
		</section>

	</div>

</template>

<script type="text/babel">

	// lib
	import graphs from 'metrics-graphics';
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
			this.makeEmptyChart();
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

						// filter to get only the temperatures linked to the hardware selected
						const temperatures = _filter( this.records, { name: hardware_name } );

						// convert to dates
						for( let d = 0; d < temperatures.length; d++ ) {

							temperatures[ d ][ 'sensor_created_at' ] = new Date( temperatures[ d ][ 'sensor_created_at' ] ) ;

						}

						sorted_by_hardwares.push( temperatures );

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
			 * make an empty chart when no records available
			 * also used before data is loaded
			 *
			 * @author shad
			 */
			makeEmptyChart() {

				graphs.data_graphic( {

					// title
					title: "Donnees Manquantes",

					// chart type for missing data (with a placeholder image)
					chart_type: 'missing-data',

					// text to show when missing data
					missing_text: 'Aucune donnee disponible. Revenez plus tard.',

					// DOM element target
					target: '#temperature-chart',

					// use full available width
					full_width: true,

					// height
					height: 400

				} );

			},

			/**
			 * update the chart with the given records
			 *
			 * @author shad
			 */
			updateChart() {

				graphs.data_graphic( {

					// title
					title: 'Température',

					// current data
					data: this.sorted_by_hardwares,

					// height
					height: 400,

					// use full available width
					full_width: true,

					// DOM element target
					target: '#temperature-chart',

					// time span start
					min_x: this.date_start,

					// time span end
					max_x: this.date_end,

					// data prop to use on the x axis (from this.sorted_by_hardwares)
					x_accessor: 'sensor_created_at',

					// data prop to use on the y axis (from this.sorted_by_hardwares)
					y_accessor: 'sensor_temperature',

					// add names to each lines
					legend: this.hardwares_names,

					// don't cut per area
					area: false,

					// on line mouse over, returned a french formatted date
					x_mouseover( d ) {
						return `${moment( d.sensor_created_at ).format( 'DD MMM YYYY HH:mm' )} - `;
					},

					// on line mouse over, return a unit concat to current value
					y_mouseover( d ) {
						return `${d.sensor_temperature} °C`;
					}

				} );

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
