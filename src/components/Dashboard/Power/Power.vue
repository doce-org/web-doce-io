<template>

    <div id="dashboard-power-component" class="tile is-child">

        <div class="columns is-vcentered is-marginless has-text-centered">

            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-arrows"></i>
                </span>
            </div>
            <div class="column">
                <h6 class="title is-6">Energie</h6>
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
                    <div class="subtitle has-text-centered is-1">{{average_power || '...'}} W</div>
                    <p class="subtitle has-text-centered is-4">Puissance Moyenne</p>
                </div>

                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Basse</p>
                            <p class="subtitle">{{lowest_power || '...'}} W</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Haute</p>
                            <p class="subtitle">{{highest_power || '...'}} W</p>
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

                            <!-- power value -->
                            <td>{{hardware.last_record.power}}</td>

                            <!-- when -->
                            <td>{{hardware.last_record.created_at | timeFromNow}}</td>

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
    import { lastRecordPerHardwareView, hardwarePowerRecordService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of hardware sensors
                // of temperatures type
				// @type {Array}
                'hardwares': [],

                // details mode activation
                // @type {Boolean}
                'details_mode': false

            }
        },

        created() {
            this.findLastPowersRecords();
            this.keepInSync();
        },

        computed : {

            /**
             * calculate the average power amongs all
             * currently available hardwares
             *
             * @return {String}
             *
             * @author shad
             */
            average_power() {

                if ( this.hardwares.length > 0 ) {

                    // extract powers from each hardwares
                    const powers = this.hardwares.map( hardware => +hardware.last_record.power );

                    return ( powers.reduce( ( cur, val ) => cur + val, 0 ) / powers.length ).toFixed( 2 );

                }

                return;

            },

            /**
             * find the lowest power in available hardwares
             *
             * @return {Number}
             *
             * @author shad
             */
            lowest_power() {

                if ( this.hardwares.length > 0 ) {

                    // extract powers from each hardwares
                    const powers = this.hardwares.map( hardware => +hardware.last_record.power );

                    // return lowest power
                    return Math.min.apply( null, powers );

                }

                return;

            },

            /**
             * find the highest power in available hardwares
             *
             * @return {Number}
             *
             * @author shad
             */
            highest_power() {

                if ( this.hardwares.length > 0 ) {

                    // extract powers from each hardwares
                    const powers = this.hardwares.map( hardware => +hardware.last_record.power );

                    // return max. power
                    return Math.max.apply( null, powers );

                }

                return;

            }

        },

        methods: {

            /**
             * get listing of available power
             *
             * @author shad
             */
            findLastPowersRecords() {

				const query = { query: {

					// of type 'POWER'
					type: {
                        $in: [ 'P' ]
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
             * keep last data up-to-date with the server on
             * temperature record creation, which can come from
             * the 'POWER' hardwares
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

                        this.findLastPowersRecords();

                    }

                };

                // sync with 'POWER' hardwares
                hardwarePowerRecordService.on( 'created', updateTransmitter );

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

    #dashboard-power-component {
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
