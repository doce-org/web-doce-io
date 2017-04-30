<template>

    <div class="sixteen wide column">

        <div class="ui basic segment">
            <h4 class="ui grey header">Activités Récentes</h4>
        </div>

		<div class="ui basic segment">
			<div class="ui list">

				<!-- each of the last 10 logs -->
				<div v-for="log in last_logs" v-bind="{'orange': log.type === 'warning', 'red': log.type === 'error'}"
						class="item">
					<i class="angle right icon"></i>
					{{log.message}}
				</div>

			</div>
		</div>


    </div>

</template>

<script type="text/babel">

	// lib
	import _orderBy from 'lodash/orderBy';
	import _take from 'lodash/take';
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
			 * return the last 10 logs
			 *
			 * @return {Array}
			 *
			 * @author shad
			 */
			last_logs() {

				const logs = _orderBy( this.logs, 'id', 'desc' );

				return _take( logs, 10 );

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

				&.orange{
					color: #e67e22;
				}

				&.red{
					color: #e74c3c;
				}
			}
		}
    }

</style>
