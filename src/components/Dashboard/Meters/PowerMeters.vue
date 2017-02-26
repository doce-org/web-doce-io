<template>

    <div>

        <h4 class="ui disabled center aligned header">Énergie</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="hardware in hardwares">

                    <!-- name -->
                    <td>{{hardware.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <power-meter-record :hardware_id="hardware.id"></power-meter-record>
                    </td>

                </tr>

            </tbody>
        </table>

    </div>

</template>

<script type="text/babel">

    // services
    import { hardwareService } from 'services';
    // components
    import PowerMeterRecord from './PowerMeterRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			PowerMeterRecord

		},

        data() {
            return {

				// contain the listing of hardware energy gauge
				// linked to the current room id
				// @type {Array}
                'hardwares': []

            }
        },

        created() {
            this.findHardwarePowerMeters();
        },

        methods: {

            /**
             * get listing of available power for a specified room
             *
             * @author shad
             */
            findHardwarePowerMeters() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'energy'
					type: 'energy'

				} };

               	hardwareService.find( query )
            	.then( hardwares => this.hardwares = hardwares )
                .catch( console.error );

            }

        }

    }

</script>
