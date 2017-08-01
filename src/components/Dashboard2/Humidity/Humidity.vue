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

        <div class="columns is-centered is-vcentered is-marginless">

            <div class="block">

                <div class="block">
                    <p class="title has-text-centered is-1">{{average_humidity || '...'}}</p>
                    <p class="subtitle has-text-centered is-3">Hum. Moyenne</p>
                </div>

                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Basse</p>
                            <p class="title">{{lowest_humidity || '...'}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Haute</p>
                            <p class="title">{{highest_humidity || '...'}}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

        // services
    import { lastRecordPerTransmitterView } from 'services';

    export default {

        data() {
            return {

				// contain the listing of transmitter sensors
                // of humidity type
				// @type {Array}
                'transmitters': []

            }
        },

        created() {
            this.findLastHumiditiesRecords();
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
                    const humidities = this.transmitters.map( transmitter => transmitter.last_record.humidity );

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
                    const humidities = this.transmitters.map( transmitter => transmitter.last_record.humidity );

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
                    const humidities = this.transmitters.map( transmitter => transmitter.last_record.humidity );

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

            }

        }

    }

</script>

<style lang="scss">

    #dashboard-humidity-component {

        .columns {
            background: white;

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &:last-child {
                min-height: 300px;
            }
        }
    }

</style>


