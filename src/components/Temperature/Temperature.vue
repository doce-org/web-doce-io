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
	// services
	import { temperatureSensorRecordService } from 'services';

	export default {

		data() {
			return {
				records: false
			}
		},

		route: {

			data() {
				return this.getSensorData();
			}

		},

		ready() {
			this.makeEmptyChart();
		},

		watch: {

			'records'() {
				records ? this.makeTempChart() : this.makeEmptyChart();
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
				return temperatureSensorRecordService.find( { query: {
					created_at: { $gte: date_start, $lte: date_end },
					$sort: { created_at: -1 },
					withSensor: true
				} } )
						.then( datas => ( { records: datas.length > 0 && datas } ) )
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
					missing_text: 'This is an example of a missing chart',
					data: this.records,
					height: 400,
					full_width: true,
					target: '#temperature-chart',
					x_accessor: 'year',
					y_accessor: 'value',
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