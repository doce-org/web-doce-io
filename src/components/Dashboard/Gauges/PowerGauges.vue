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
                        <power-gauge-record :hardware_id="hardware.id"></power-gauge-record>
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
    import PowerGaugeRecord from './PowerGaugeRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			PowerGaugeRecord

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
            this.findHardwarePowerGauges();
        },

        methods: {

            /**
             * get listing of available power for a specified room
             *
             * @author shad
             */
            findHardwarePowerGauges() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'temperature'
					type: 'energy'

				} };

               	hardwareService.find( query )
            	.then( hardwares => this.hardwares = hardwares )
                .catch( console.error );

            }

        }

    }

</script>
