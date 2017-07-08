<template>

    <div class="sixteen wide column">

        <div class="ui basic segment">
            <h4 class="ui grey header">Activités Récentes</h4>
			<div class="ui tiny basic icon buttons">
				<div class="ui icon button"
					v-bind:class="{'active': types.indexOf('info') !== -1}"
					@click="updateRequestedTypes('info')"
					data-tooltip="Informations">
					<i class="circle blue icon"></i>
				</div>
				<div class="ui icon button"
					v-bind:class="{'active': types.indexOf('warning') !== -1}"
					@click="updateRequestedTypes('warning')"
					data-tooltip="Alertes">
					<i class="circle orange icon"></i>
				</div>
				<div class="ui icon button"
					v-bind:class="{'active': types.indexOf('error') !== -1}"
					@click="updateRequestedTypes('error')"
					data-tooltip="Erreurs">
					<i class="circle red icon"></i>
				</div>
				<div class="ui icon button"
					v-bind:class="{'active': types.indexOf('debug') !== -1}"
					@click="updateRequestedTypes('debug')"
					data-tooltip="Debuggage">
					<i class="circle icon"></i>
				</div>
			</div>
			<!--<div class="ui icon top right pointing dropdown basic button">
				<input type="hidden" name="gender">
				<i class="setting icon"></i>
				<div class="menu">
					<div v-bind:class="{'active': types.indexOf('info') !== -1}"
						@click="updateRequestedTypes('info')" 
						class="item" 
						data-value="info">
						Infos
					</div>
					<div v-bind:class="{'active': types.indexOf('warning') !== -1}"
						@click="updateRequestedTypes('warning')" 
						class="item" 
						data-value="warning">
						Alertes
					</div>
					<div v-bind:class="{'active': types.indexOf('error') !== -1}"
						@click="updateRequestedTypes('error')" 
						class="item" 
						data-value="error">
						Erreurs
					</div>
					<div v-bind:class="{'active': types.indexOf('debug') !== -1}"
						@click="updateRequestedTypes('debug')" 
						class="item" 
						data-value="debug">
						Debug
					</div>
				</div>
			</div>-->
        </div>

		<div class="ui basic segment">
			<div class="ui list">

				<!-- each of the last 10 logs -->
				<div v-for="log in reversed_logs" track-by="$index" class="item">
					<i v-bind:class="{
							'black': log.type === 'debug',
							'blue': log.type === 'info',
							'orange': log.type === 'warning', 
							'red': log.type === 'error'
						}" class="circle icon"></i>
					<div class="content">
						<div class="header">{{log.message}}</div>
						<div class="description">{{log.created_at | momentFormat false 'DD MMM HH:mm.ss'}}</div>
					</div>
				</div>

			</div>
		</div>	

    </div>

</template>

<script type="text/babel">

	// lib
	import _orderBy from 'lodash/orderBy';
	import _take from 'lodash/take';
	import moment from 'moment';
	// services
	import { logService } from 'services';

    export default {

		data() {
			return {

				// contain the listing of the last 10 logs
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

		ready() {
			$( '.ui.dropdown', this.$el ).dropdown();
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

					// limit to the last 10 logs
					$limit: 10,

					// get the last 10
					$sort: { created_at: -1 }

				} };

				logService.find( query )
				.then( logs => this.logs = logs )
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
						// than 10 logs already on the client
						if ( this.logs.length > 10 )  this.logs.shift();

					}

				} );

			}

		}

    }

</script>

<style lang="scss" scoped>

	// dropdown selector style
	.ui.buttons {
		position: absolute;
		top: 0;
		right: 0;
		border-radius: 0;
		box-shadow: none;
	}

	// special column style
    .column {
        background: #e6eaf4;

		.ui.basic.segment {
			margin: 0;
		}

		.ui.list {

			.item {
				font-size: .9em;

				.content {

					// force log message to break
					// when too long word overflows
					.header {
						word-break: break-word;
					}
				}
			}
		}
    }

</style>
