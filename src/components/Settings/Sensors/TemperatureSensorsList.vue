<template>

    <table class="ui very basic selectable table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
				<th>Connection</th>
				<th>Piece</th>
                <th class="collapsing">

					<!-- add a temperature sensor -->
                    <a v-link="{name: 'temperatures_sensor_form'}" class="ui green basic button">
						Ajouter une sonde
					</a>

                </th>
            </tr>
        </thead>
        <tbody>

			<!-- each temperature sensor -->
            <tr v-for="hardware in hardwares">

				<!-- identifier -->
				<td>{{hardware.identifier}}</td>

				<!-- name -->
                <td>{{hardware.name}}</td>

				<!-- port name -->
				<td></td>

				<!-- room_name -->
				<td></td>

                <td class="single line">

                    <a v-link="" class="ui blue basic button disabled">Informations</a>

                    <a v-link="" class="ui orange basic button disabled">Modifier</a>

                </td>

            </tr>

        </tbody>
    </table>

</template>

<script type="text/babel">

    import { hardwareService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of temperature hardware registered
				// @type {Array}
                'hardwares': []

            }
        },

		route: {

			data() {
				return this.findTemperatureHardwareListing();
			}

		},

        methods: {

            /**
             * find temperature hardware listing
             *
             * @return {Promise}
             *
             * @author shad
             */
            findTemperatureHardwareListing() {

                return hardwareService.find( { query: { type: 'temperature' } } )
                .then( hardwares => ( { hardwares } ) )
                .catch( console.error );

            }

        }
    }

</script>
