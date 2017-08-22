<template>

	<div class="columns is-multiline">

		<!-- each hardwares -->
		<div v-for="hardware in hardwares" class="column is-12">

			<!-- hardware -->
			<div class="level">
				<div class="level-left">
					<div class="level-item">
						<div class="icon small">
							<i class="fa fa-level-up"></i>
						</div>
						{{hardware.name}}
					</div>
				</div>
				<div class="level-right">


					
				</div>
			</div>

		</div>

		<div v-if="!is_loading && hardwares.length === 0" class="column is-12">
			<p>Aucun materiel trouve.</p>
		</div>

	</div>

</template>

<script>

	// services
	import { hardwareService } from 'services';

    export default {

		props: [

			// contain the root room id
			// type {Integer}
			'room_id'

		],

		data() {
			return {

				// user visual feedback to know when
				// currently loading the requested data
				// @type {Boolean}
				'is_loading': false,

				// contain the listing of childs hardwares
				// @type {Array}
				'hardwares': false

			}
		},

		created() {
			this.findChildrensdHardwares();
		},

		methods: {

			/**
			 * find a listing of childs hardwares to the current parent
			 *
			 * @author shad
			 */
			findChildrensdHardwares() {

				this.is_loading = true;

				let query = { query: {

					// child of room
					'room_id': this.room_id

				} };

				hardwareService.find( query )
				.then( hardwares => {

					this.is_loading = false;

					this.hardwares = hardwares;

				} )
				.catch( err => {

					this.is_loading = false;
					this.handlingErrors( err );

				} );

			}

		}

    }

</script>

<style lang="scss" scoped>

	.columns {
		margin-left: 1em;
	}

</style>
