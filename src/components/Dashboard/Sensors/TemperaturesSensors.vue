<template>

    <div>

        <h4 class="ui disabled center aligned header">Température</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="hardware in hardwares">

                    <!-- name -->
                    <td>{{hardware.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <temperature-sensor-record :hardware_id="hardware.id"></temperature-sensor-record>
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
    import TemperatureSensorRecord from './TemperatureSensorRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			TemperatureSensorRecord

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
            this.findHardwareSensors();
        },

        methods: {

            /**
             * get listing of available temperature
             * for a specified room
             * @author shad
             */
            findHardwareSensors() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'temperature'
					type: 'temperature'

				} };

               	hardwareService.find( query )
            	.then( hardwares => this.hardwares = hardwares )
                .catch( console.error );

            }

        }

    }

</script>
