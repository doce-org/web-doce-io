<template>
  
    <div id="dashboard-temperature-component" class="tile is-child">

        <div class="columns is-vcentered is-marginless has-text-centered">

            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-arrows"></i>
                </span>
            </div>
            <div class="column">
                <h6 class="title is-6">Temperature</h6>
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
                    <p class="title has-text-centered is-1">{{average_temperature || '...'}} °C</p>
                    <p class="subtitle has-text-centered is-3">Temp. Moyenne</p>
                </div>

                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Basse</p>
                            <p class="title">{{lowest_temperature || '...'}} °C</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Haute</p>
                            <p class="title">{{highest_temperature || '...'}} °C</p>
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

                            <!-- temperature value -->
                            <td>{{transmitter.last_record.temperature}} °C</td>

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
    import { lastRecordPerTransmitterView, 
        transmitterTemperatureRecordService, 
        transmitterHumidityRecordService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of transmitter sensors
                // of temperatures type
				// @type {Array}
                'transmitters': [],

                // details mode activation
                // @type {Boolean}
                'details_mode': false

            }
        },

        created() {
            this.findLastTemperaturesRecords();
            this.keepInSync();
        },

        computed : {

            /**
             * calculate the average temperature amongs all 
             * currently available transmitters
             * 
             * @return {String}
             * 
             * @author shad
             */
            average_temperature() {

                if ( this.transmitters.length > 0 ) {

                    // extract temperatures from each transmitters
                    const temperatures = this.transmitters.map( transmitter => +transmitter.last_record.temperature );

                    return ( temperatures.reduce( ( cur, val ) => cur + val, 0 ) / temperatures.length ).toFixed( 2 );

                }

                return;

            },

            /**
             * find the lowest temperature in available transmitters
             * 
             * @return {Number}
             * 
             * @author shad
             */
            lowest_temperature() {

                if ( this.transmitters.length > 0 ) {

                    // extract temperatures from each transmitters
                    const temperatures = this.transmitters.map( transmitter => +transmitter.last_record.temperature );

                    // return lowest temperature
                    return Math.min.apply( null, temperatures );

                }

                return;

            },

            /**
             * find the highest temperature in available transmitters
             * 
             * @return {Number}
             * 
             * @author shad
             */
            highest_temperature() {

                if ( this.transmitters.length > 0 ) {

                    // extract temperatures from each transmitters
                    const temperatures = this.transmitters.map( transmitter => +transmitter.last_record.temperature );

                    // return max. temperature
                    return Math.max.apply( null, temperatures );

                }

                return;

            }

        },

        methods: {

            /**
             * get listing of available temperature
             *
             * @author shad
             */
            findLastTemperaturesRecords() {

				const query = { query: {

					// of type 'TEMPERATURE'
                    // OR 'HUMIDITY'
					type: {
                        $in: [ 'TEMPERATURE', 'HUMIDITY' ]
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
             * both the 'TEMPERATURE' or 'HUMIDITY' transmitters
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

                // sync with 'TEMPERATURE' transmitters
                transmitterTemperatureRecordService.on( 'created', updateTransmitter );

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

    #dashboard-temperature-component {

        .columns {
            background: white;

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &.content {
                min-height: 300px;
            }
        }
    }

</style>


