<template>

    <div id="activities" class="column">

		<div class="level">

			<div class="level-left">

				<!-- <div class="level-item">
					<div class="icon is-small white">
						<i class="fa fa-code"></i>
					</div>
				</div> -->

				<div class="level-item">
					<div class="field has-addons">

						<!-- info logs -->
						<p class="control">
							<a v-bind:class="{'active': types.indexOf('info') !== -1}"
							@click="updateRequestedTypes('info')"
							class="button blue is-small">
								<span class="icon is-small">
									<i class="fa fa-circle"></i>
								</span> 
							</a>
						</p>

						<!-- warning logs -->
						<p class="control">
							<a v-bind:class="{'active': types.indexOf('warning') !== -1}"
							@click="updateRequestedTypes('warning')" 
							class="button orange is-small">
								<span class="icon is-small">
									<i class="fa fa-circle"></i>
								</span> 
							</a>
						</p>

						<!-- error logs -->
						<p class="control">
							<a v-bind:class="{'active': types.indexOf('error') !== -1}"
							@click="updateRequestedTypes('error')"
							class="button red is-small">
								<span class="icon is-small">
									<i class="fa fa-circle"></i>
								</span> 
							</a>
						</p>

						<!-- debug logs -->
						<p class="control">
							<a v-bind:class="{'active': types.indexOf('debug') !== -1}"
							@click="updateRequestedTypes('debug')"
							class="button white is-small">
								<span class="icon is-small">
									<i class="fa fa-circle"></i>
								</span> 
							</a>
						</p>

					</div>
				</div>

			</div>

			<div class="level-right">
				<h6 v-link="{name: 'logs'}" class="title is-6 has-text-right">ACTIVITES</h6>
			</div>

		</div>

		<!-- each log -->
		<div v-for="log in reversed_logs" track-by="$index" class="columns">

			<div class="column is-narrow">
				<span v-bind:class="{
						'white': log.type === 'debug',
						'blue': log.type === 'info',
						'orange': log.type === 'warning', 
						'red': log.type === 'error'
					}" class="icon is-small">
					<i class="fa fa-circle"></i>
				</span> 
			</div>
			<div class="column">
				<p class="content">{{log.message}}</p>
				<p class="content">{{log.created_at | momentFormat false 'DD MMM HH:mm.ss'}}</p>
			</div>

		</div>

    </div>

</template>

<script type="text/babel">

	// lib
	import _orderBy from 'lodash/orderBy';
	
	// services
	import { logService } from 'services';

    export default {

		data() {
			return {

				// contain the listing of the last 5 logs
				// @type {Array}
				'logs': [],

				// contain loaded logs type
				// @type {Array}
				'types': [ 'info' ]

			}
		},

		created() {
			this.findLastLogs();
			this.onNewLogCreated();
		},

		computed: {
			
			/**
			 * reverse logs ordering
			 *
			 * @return {Array}
			 *
			 * @author shad
			 */
			reversed_logs() {

				return this.logs && _orderBy( this.logs, 'created_at', 'desc' );

			}

		},

		methods: {

			/**
			 * find the last 10 logs on load
			 *
			 * @author shad
			 */
			findLastLogs() {

				const query = { query: {

					// limited to requested types
					type: {
						$in: this.types
					},

					// limit to the last 5 logs
					$limit: 5,

					// get the last 5
					$sort: { created_at: -1 }

				} };

				logService.find( query )
				.then( logs => this.logs = logs.data )
				.catch( this.handlingErrors );

			},

			/**
			 * update the array of logs types requested by the user
			 *
			 * @param {String} type
			 *
			 * @author shad
			 */
			updateRequestedTypes( type ) {

				// find index of current type
				const type_idx = this.types.indexOf( type );

				type_idx === -1 
					// add the type if not available yet
					? this.types.push( type )
					// remove it otherwise
					: this.types.splice( type_idx );

				// update logs listing
				this.findLastLogs();

			},

			/**
			 * when new log is created, add it to the list
			 *
			 * @on /logs
			 * @event created
			 *
			 * @author shad
			 */
			onNewLogCreated() {

				logService.on( 'created', log => {

					// only keep the new log if currently
					// of a requested type by the user
					if ( this.types.indexOf( log.type ) !== -1 ) {

						this.logs.push( log );

						// remove the first element if we have more
						// than 5 logs already on the client
						if ( this.logs.length > 5 ) this.logs.shift();

					}

				} );

			}

		}

    }

</script>

<style lang="scss">

	#activities {
		border-top: 1px solid #313c4d;
		overflow-y: auto;

		.title {
			color: white;
			font-weight: 400;
			cursor: pointer;
		}

		.button {
			border-radius: 0;
			border-left: 1px solid #3c485a;
			border-top: 1px solid #3c485a;
			border-bottom: 1px solid #3c485a;
			background: transparent;

			&:last-child {
				border-right: 1px solid #3c485a;
			}

			&.active {
				background: #2f3949;
			}

		}

		.button, .icon {

			&.blue {
				color: #0098ff;
			}

			&.orange {
				color: #fc0;
			}

			&.red {
				color: red;
			}

			&.white {
				color: white;
			}

		}

		.columns {
			margin-bottom: .3em;

			p {

				&.content {
					color: white;
					font-size: .7em;
					margin-bottom: 0;
					word-break: break-word;

					&:last-child {
						font-size: .6em;
						color: #dedede;
					}
				}
			}
		}
	}

</style>
