<template>

    <div>

        <h4 class="ui disabled center aligned header">Humidité</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="hardware in hardwares">

                    <!-- name -->
                    <td>{{hardware.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <humidity-sensor-record :hardware_id="hardware.id"></humidity-sensor-record>
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
    import HumiditySensorRecord from './HumiditySensorRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			HumiditySensorRecord

		},

        data() {
            return {

				// contain the listing of hardware sensors
				// linked to the current room id
				// @type {Array}
                'hardwares': []

            }
        },

        created() {
            this.findHardwareHumiditiesSensors();
        },

        methods: {

            /**
             * get listing of available humidities sensors for a specified room
             *
             * @author shad
             */
            findHardwareHumiditiesSensors() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'temperature'
					type: 'humidity'

				} };

               	hardwareService.find( query )
            	.then( hardwares => this.hardwares = hardwares )
                .catch( console.error );

            }

        }

    }

</script>
