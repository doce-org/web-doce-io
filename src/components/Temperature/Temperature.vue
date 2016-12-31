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
	// services
	import { temperatureSensorRecordService } from 'services';

	export default {

		data() {
			return {
				datas: false
			}
		},

		route: {

			data() {
				this.getSensorData();
			}

		},

		ready() {
			this.makeEmptyChart();
		},

		watch: {

			/**
			 * redo the chart each time the
			 * records data changes
			 */
			'filtered_records'() {
				this.makeTempChart();
			}

		},

		computed: {

			/**
			 * prepare sensors listing
			 */
			filtered_sensors() {
				const sensors = [];
				if( this.datas ) {
					this.datas.sensors.forEach( sensor => {
						sensors.push( _pick( sensor, [ 'name' ] ) );
					} );
				}
				return sensors;
			},

			/**
			 * prepare records listing
			 */
			filtered_records() {
				let records = [];
				if( this.datas ) {
					Object.keys( this.datas.records ).forEach( key => {
						const records_list = this.datas.records[ key ];
						// pick only the wanted data
						records_list.forEach( record =>
								records.push( _pick( record, [ 'created_at', 'temperature' ] ) ) );
						// convert to date
						records.forEach( ( record, idx ) =>
								records[ idx ].created_at = new Date( records[ idx ].created_at ) );
					} );
				}
				return records;
			}

		},

		methods: {

			/**
			 * get the temperature sensors records
			 * @returns {Promise}
			 * @author shad
			 */
			getSensorData() {
				const date_end = moment();
				const date_start = moment().subtract( 24, 'hours' );
				temperatureSensorRecordService.find( { query: {
					created_at: { $gte: date_start, $lte: date_end },
					$sort: { created_at: -1 },
					withSensor: true
				} } )
						.then( datas => {
							this.datas = datas;
						} )//( { datas: datas.length > 0 && datas } ) )
						.catch( console.error );
			},

			/**
			 * make an empty chart when no records available
			 */
			makeEmptyChart() {
				graphs.data_graphic({
					title: "Donnees Manquantes",
					chart_type: 'missing-data',
					missing_text: 'Aucune donnee disponible. Revenez plus tard.',
					target: '#temperature-chart',
					full_width: true,
					height: 400
				});
			},

			/**
			 * make a chart with the given records
			 */
			makeTempChart() {
				graphs.data_graphic({
					title: 'Temperature',
					data: this.filtered_records,
					height: 400,
					full_width: true,
					target: '#temperature-chart',
					x_accessor: 'created_at',
					y_accessor: 'temperature',
					area: false
				})
			}

		}

	}

</script>

<style lang="scss">

	#temperature {
		height: 100vh;
		& .column {
			 overflow-y: auto;
			 overflow-x: hidden;
		 }
	}

</style>