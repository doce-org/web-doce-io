<template>

    <div id="dashboard-humidity-component" class="tile is-child">

        <div class="columns is-vcentered is-marginless has-text-centered">

            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-arrows"></i>
                </span>
            </div>
            <div class="column">
                <h6 class="title is-6">Humidite</h6>
            </div>
            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-cog"></i>
                </span>
            </div>

        </div>

        <div v-on:click="alternateView" class="columns is-centered is-vcentered is-marginless content">

            <div v-if="!details_mode" class="block">

                <div class="block">
                    <div class="subtitle has-text-centered is-1">{{average_humidity || '...'}} %</div>
                    <p class="subtitle has-text-centered is-4">Hum. Moyenne</p>
                </div>

                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Basse</p>
                            <p class="subtitle">{{lowest_humidity || '...'}} %</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Haute</p>
                            <p class="subtitle">{{highest_humidity || '...'}} %</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="details_mode" class="block">

                <table class="table">
                    <tbody>

                        <!-- for each hardware -->
                        <tr v-for="hardware in hardwares">

                            <!-- name -->
                            <td>{{hardware.name}}</td>

                            <!-- humidity value -->
                            <td>{{hardware.last_record.humidity}} %</td>

                            <!-- when -->
                            <td>{{hardware.last_record.created_at | timeFromNow}}</td>

                        </tr>

                    </tbody>
                </table>

            </div>

        </div>

        <div class="columns is-marginless">
            <div class="column is-paddingless">

                <canvas class="humidity chart" height="100"></canvas>

            </div>
        </div>

    </div>

</template>

<script>

    // lib
    import _findIndex from 'lodash/findIndex';
    import moment from 'moment';
    import chartJs from 'chart.js';
    // services
    import { lastRecordPerHardwareView, hardwareHumidityRecordService, recordHumidityAvgLast24HoursView } from 'services';

    export default {

        data() {
            return {

				// contain the listing of hardware sensors
                // of humidity type
				// @type {Array}
                'hardwares': [],

                // contain the last 6 hours of avg hum. per 30 minutes batch
                // @type {Array}
                'humidities_avg_last_6_hours': [],

                // details mode activation
                // @type {Boolean}
                'details_mode': false,

                // contain the current canvas object
                // @type {Object}
                'canvas': false

            }
        },

        created() {
            this.findLastHumiditiesRecords();
            this.findAvgHumidities();
            this.keepInSync();
        },

        computed : {

            /**
             * calculate the average humidity amongs all
             * currently available hardwares
             *
             * @return {String}
             *
             * @author shad
             */
            average_humidity() {

                if ( this.hardwares.length > 0 ) {

                    // extract humidities from each hardwares
                    const humidities = this.hardwares.map( hardware => +hardware.last_record.humidity );

                    return ( humidities.reduce( ( cur, val ) => cur + val, 0 ) / humidities.length ).toFixed( 2 );

                }

                return;

            },

            /**
             * find the lowest humidity in available hardwares
             *
             * @return {Number}
             *
             * @author shad
             */
            lowest_humidity() {

                if ( this.hardwares.length > 0 ) {

                    // extract humidities from each hardwares
                    const humidities = this.hardwares.map( hardware => +hardware.last_record.humidity );

                    // return lowest humidity
                    return Math.min.apply( null, humidities );

                }

                return;

            },

            /**
             * find the highest humidity in available hardwares
             *
             * @return {Number}
             *
             * @author shad
             */
            highest_humidity() {

                if ( this.hardwares.length > 0 ) {

                    // extract humidities from each hardwares
                    const humidities = this.hardwares.map( hardware => +hardware.last_record.humidity );

                    // return max. humidity
                    return Math.max.apply( null, humidities );

                }

                return;

            }

        },

        methods: {

            /**
             * get listing of available humidity
             *
             * @author shad
             */
            findLastHumiditiesRecords() {

				const query = { query: {

					// of type 'HUMIDITY'
					type: {
                        $in: [ 'HUMIDITY' ]
                    }

				} };

               	lastRecordPerHardwareView.find( query )
            	.then( hardwares => {

                    // set listing of hardwares
                    this.hardwares = hardwares;

                } )
                .catch( this.handlingErrors );

            },

            /**
             * get a listing per 30 minutes batch of the last
             * 6 hours humidities averages data
             *
             * @author shad
             */
            findAvgHumidities() {

                // obtain time 6 hours ago
                const last_6_hours = moment().subtract( 6, 'hours' ).toDate();

                const query = { query: {

                    // get only the last 6 hours
                    current_interval_time: {
                        $gte: last_6_hours
                    }

                } };

                recordHumidityAvgLast24HoursView.find( query )
                .then( records_avg => {

                    // set the average temps.
                    this.humidities_avg_last_6_hours = records_avg;

                    // build the new avg temp. chart
                    this.$nextTick( this.buildAvgChart );

                    // update in 30 minutes
                    setTimeout( this.findAvgHumidities, 1000 * 60 * 30 );

                } )
                .catch( this.handlingErrors );

            },

            /**
             * keep last data up-to-date with the server on
             * temperature record creation, which can come from
             * 'HUMIDITY' hardwares only
             */
            keepInSync() {

                // either update the hardware last record data if found
                // or reload the hardware last record list, because if we
                // haven't found the linked hardware, means there's a new
                // one not in the list on the first listing check
                const updateTransmitter = ( record ) => {

                    const hardware_idx = _findIndex( this.hardwares, { id: record.hardware_id } );

                    if ( hardware_idx !== -1 ) {

                        this.hardwares[ hardware_idx ].last_record = record;

                    }

                    else {

                        this.findLastTemperaturesRecords();

                    }

                };

                // sync with 'HUMIDITY' hardwares
                hardwareHumidityRecordService.on( 'created', updateTransmitter );

            },

            /**
             * change view of data between summary and details
             *
             * @author shad
             */
            alternateView() {

                this.details_mode = !this.details_mode;

            },

            /**
             * build the average humidities chart
             *
             * @author shad
             */
            buildAvgChart() {

                const ctx = $( '.humidity.chart', this.$el )[ 0 ].getContext( '2d' );

                // destroy previous canvas if exist
                if ( this.canvas ) this.canvas.destroy();

                this.canvas = new chartJs( ctx, {

                    type: 'line',

                    data: {

                        labels: this.humidities_avg_last_6_hours.map( avg => avg.current_interval_time ),

                        datasets: [ {
                            data: this.humidities_avg_last_6_hours.map( avg => avg.humidity ),
                            backgroundColor: [ '#ebf5fc' ],
                            borderColor: [ '#dbedf9' ]
                        } ]

                    },

                    options: {

                        legend: {

                            display: false

                        },

                        tooltips: {

                            enabled: false

                        },

                        scales: {

                            xAxes: [ {

                                gridLines: { display: false, drawBorder: false, tickMarkLength: 0 },
                                scaleLabel: { display: false },
                                ticks: { display: false }

                            } ],

                            yAxes: [ {

                                gridLines: { display: false, drawBorder: false, tickMarkLength: 0 },
                                scaleLabel: { display: false },
                                ticks: { display: false }

                            } ],

                        }

                    }

                } );

            }

        }

    }

</script>

<style lang="scss">

    #dashboard-humidity-component {
        height: 300px;
        background: white;
        position: relative;

        .columns {
            position: relative;

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &.content {
                padding: 2rem;

                .table {
                    background: transparent;
                }
            }

            &:not(last-child) {
                z-index: 100
            }

            &:last-child {
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 0;
                width: 100%;
            }
        }
    }

</style>
