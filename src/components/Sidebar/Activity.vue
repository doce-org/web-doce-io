<template>

    <div class="sixteen wide column">

        <div class="ui basic segment">
            <h4 class="ui grey header">Activités Récentes</h4>
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
				'logs': []

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
			 * when new log is created, add it to the list
			 *
			 * @on /logs
			 * @event created
			 *
			 * @author shad
			 */
			onNewLogCreated() {

				logService.on( 'created', log => {

					this.logs.push( log );

					// remove the first element if we have more
					// than 10 logs already on the client
					if ( this.logs.length > 10 )  this.logs.shift();

				} );

			}

		}

    }

</script>

<style lang="scss" scoped>

	// special column style
    .column {
        background: #e6eaf4;

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
