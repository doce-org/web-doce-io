<template>
  
    <div class="column">

        <h4 class="subtitle is-4">Notifications Systeme</h4>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>

                <!-- each logs -->
                <tr v-for="log in logs">
                    <td>{{log.created_at | momentFormat false 'DD MMM YYYY HH:mm:ss'}}</td>
                    <td>{{log.type}}</td>
                    <td>{{log.message}}</td>
                </tr>

            </tbody>
        </table>

        <nav class="pagination">

            <!-- previous -->
            <a v-link="{
				name: 'logs',
				exact: true,
				query: {
					skip: pagination.skip - pagination.limit
				},
				activeClass: '-' }"
                v-bind:disabled="pagination.skip === 0"
                class="pagination-previous">Precedent</a>
            
            <!-- next -->
            <a v-link="{
				name: 'logs',
				exact: true,
				query: {
					skip: pagination.skip + pagination.limit
				},
				activeClass: '-' }"
                v-bind:disabled="pagination.skip > +pagination.total" 
                class="pagination-next">Suivant</a>

        </nav>

    </div>

</template>

<script>

    // lib
    import _omit from 'lodash/omit';
    // services
    import { logService } from 'services';

    export default {

        data() {
            return {

                // contain the current list of logs
                // @type {Array}
                'logs': false,

                'pagination': {

					// contain the total of available logs
					// on the server
					// @type {Integer}
					'total': 0,

					// contain the limit of logs
					// to be returned by the server in one trip
					// @type {Integer}
					'limit': 0,

					// contain the number of logs to skip for
					// the currently requested batch
					// @type {Integer}
					'skip': 0

				},

            }
        },

        route: {

			data() {
				this.pagination.skip = this.$route.query[ 'skip' ] || 0;
				return this.getLogs();
			}

        },
        
        methods: {

            /**
             * get the logs listing
             * 
             * @return {Promise}
             * 
             * @author shad
             */
            getLogs() {

                // build required base query
				const query = { query: {

					// skip number
                    $skip: this.pagination.skip,
                    
                    // sort by latest first
                    $sort: { created_at: -1 },

                    // request max. logs
                    $limit: 25

				} };

				return logService.find( query )
				.then( logs => {

					this.logs = logs.total > 0 && logs.data;

					// setup the new pagination results
					this.pagination = _omit( logs, 'data' );

				} )
				.catch( this.handlingErrors );

            }

        }
    
    }

</script>

<style lang="scss" scoped>

    .column {
        height: 100vh;
        padding: 3em !important;
        overflow-y: auto;
    }

</style>

