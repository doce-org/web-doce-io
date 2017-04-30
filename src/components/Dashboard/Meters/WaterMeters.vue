<template>

    <div>

        <h4 class="ui disabled center aligned header">Eau</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="hardware in hardwares">

                    <!-- name -->
                    <td>{{hardware.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <water-meter-record :hardware_id="hardware.id"></water-meter-record>
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
    import WaterMeterRecord from './WaterMeterRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			WaterMeterRecord

		},

        data() {
            return {

				// contain the listing of hardware water gauge
				// linked to the current room id
				// @type {Array}
                'hardwares': []

            }
        },

        created() {
            this.findHardwareWaterMeters();
        },

        methods: {

            /**
             * get listing of available water meters for a specified room
             *
             * @author shad
             */
            findHardwareWaterMeters() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'water'
					type: 'water'

				} };

               	hardwareService.find( query )
            	.then( hardwares => this.hardwares = hardwares )
                .catch( this.handlingErrors );

            }

        }

    }

</script>
