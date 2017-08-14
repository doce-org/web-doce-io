<template>

	<div class="columns is-multiline">

		<!-- each hardwares -->
		<div v-for="hardware in hardwares" class="column is-12">

			<!-- hardware (is relay) -->
			<div v-if="hardware.is_relay" v-on:click="current_hardware_id = hardware.id" class="level">
				<div class="level-left">
					<div class="level-item">
						<div class="icon small">
							<i class="fa fa-level-up"></i>
						</div>
						{{hardware.name}}
					</div>
				</div>
				<div class="level-right">
					<div class="level-item">
						<button v-link="{name: 'setup_hardware_create', params: {parentid: hardware.id}}" class="button is-success is-outlined is-small">
							<span class="icon is-small"><i class="fa fa-plus"></i></span>
						</button>
					</div>
				</div>
			</div>

			<!-- hardware (not relay) -->
			<div v-if="!hardware.is_relay" class="level">
				<div class="level-left">
					<div class="level-item">
						<div class="icon small">
							<i class="fa fa-level-up"></i>
						</div>
						{{hardware.name}}
					</div>
				</div>
			</div>

			<!-- show nested hardwares when selected -->
			<hardwares-listing-item v-if="current_hardware_id === hardware.id"
				parent_type="relay"
				:parent_id="hardware.id"
				:room_id="room_id">
			</hardwares-listing-item>

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

			// contain the parent type
			// ex: 'room', 'relay'
			// @type {String}
			'parent_type',

			// contain the current parent id
			// either a room or a relay id
			// @type {Object}
			'parent_id',

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
				'hardwares': false,

				// contain the currently expanded hardware id
				// @type {Integer}
				'current_hardware_id': false

			}
		},

		created() {
			this.findChilrensdHardwares();
		},

		methods: {

			/**
			 * find a listing of childs hardwares to the current parent
			 *
			 * @author shad
			 */
			findChilrensdHardwares() {

				this.is_loading = true;

				let query;

				// when hardware is a direct child of a room
				if ( this.parent_type === 'room' ) {

					query = { query: {

						// child of current id
						'room_id': this.parent_id,

						// parent relay id has to be null
						'parent_relay_id': null

					} };

				}

				// when hardware is direct child of a relay
				if ( this.parent_type === 'relay' ) {

					query = { query: {

						// parent relay id has to be null
						'parent_relay_id': this.parent_id

					} };

				}

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
