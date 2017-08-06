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

                        <!-- for each transmitter -->
                        <tr v-for="transmitter in transmitters">

                            <!-- name -->
                            <td>{{transmitter.name}}</td>

                            <!-- humidity value -->
                            <td>{{transmitter.last_record.humidity}} %</td>

                            <!-- when -->
                            <td>{{transmitter.last_record.created_at | timeFromNow}}</td>

                        </tr>

                    </tbody>
                </table>

            </div>

        </div>

    </div>

</template>

<script>

    // lib
    import _findIndex from 'lodash/findIndex';
    // services
    import { lastRecordPerTransmitterView, transmitterHumidityRecordService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of transmitter sensors
                // of humidity type
				// @type {Array}
                'transmitters': [],

                // details mode activation
                // @type {Boolean}
                'details_mode': false

            }
        },

        created() {
            this.findLastHumiditiesRecords();
            this.keepInSync();
        },

        computed : {

            /**
             * calculate the average humidity amongs all 
             * currently available transmitters
             * 
             * @return {String}
             * 
             * @author shad
             */
            average_humidity() {

                if ( this.transmitters.length > 0 ) {

                    // extract humidities from each transmitters
                    const humidities = this.transmitters.map( transmitter => +transmitter.last_record.humidity );

                    return ( humidities.reduce( ( cur, val ) => cur + val, 0 ) / humidities.length ).toFixed( 2 );

                }

                return;

            },

            /**
             * find the lowest humidity in available transmitters
             * 
             * @return {Number}
             * 
             * @author shad
             */
            lowest_humidity() {

                if ( this.transmitters.length > 0 ) {

                    // extract humidities from each transmitters
                    const humidities = this.transmitters.map( transmitter => +transmitter.last_record.humidity );

                    // return lowest humidity
                    return Math.min.apply( null, humidities );

                }

                return;

            },

            /**
             * find the highest humidity in available transmitters
             * 
             * @return {Number}
             * 
             * @author shad
             */
            highest_humidity() {

                if ( this.transmitters.length > 0 ) {

                    // extract humidities from each transmitters
                    const humidities = this.transmitters.map( transmitter => +transmitter.last_record.humidity );

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

               	lastRecordPerTransmitterView.find( query )
            	.then( transmitters => {

                    // set listing of transmitters
                    this.transmitters = transmitters;

                } )
                .catch( this.handlingErrors );

            },

            /**
             * keep last data up-to-date with the server on
             * temperature record creation, which can come from
             * 'HUMIDITY' transmitters only
             */
            keepInSync() {

                // either update the transmitter last record data if found
                // or reload the transmitter last record list, because if we
                // haven't found the linked transmitter, means there's a new
                // one not in the list on the first listing check
                const updateTransmitter = ( record ) => {

                    const transmitter_idx = _findIndex( this.transmitters, { id: record.transmitter_id } );

                    if ( transmitter_idx !== -1 ) {

                        this.transmitters[ transmitter_idx ].last_record = record;

                    }

                    else {

                        this.findLastTemperaturesRecords();

                    }

                };

                // sync with 'HUMIDITY' transmitters
                transmitterHumidityRecordService.on( 'created', updateTransmitter );

            },

            /**
             * change view of data between summary and details
             * 
             * @author shad
             */
            alternateView() {

                this.details_mode = !this.details_mode;

            }

        }

    }

</script>

<style lang="scss">

    #dashboard-humidity-component {
        height: 300px;
        background: white;

        .columns {

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &.content {
                padding: 2rem;
            }
        }
    }

</style>


