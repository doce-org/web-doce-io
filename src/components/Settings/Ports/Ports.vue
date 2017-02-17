<template>

	<table class="ui very basic selectable table">

        <thead>
            <tr>
                <th>Nom</th>
                <th>Connection</th>
                <th>Constructeur</th>
                <th>Numero de Serie</th>
                <th class="collapsing">

					<!-- add a new port -->
                    <a v-link="{name: 'port_add'}" class="ui green basic button">
						<i class="plus icon"></i>
						Enregistrer un nouveau port
					</a>

                </th>
            </tr>
        </thead>

        <tbody>

			<!-- each port -->
			<tr v-for="port in ports">

				<!-- name -->
				<td>{{port.name}}</td>

				<!-- com name -->
				<td>{{port.com_name}}</td>

				<!-- manufacturer -->
				<td>{{port.manufacturer}}</td>

				<!-- serial number -->
				<td>{{port.serial_number}}</td>

				<td>

					<!-- edit port -->
					<button class="ui orange basic button disabled" type="button">
						<i class="write icon"></i>
						Editer
					</button>

				</td>

			</tr>

        </tbody>
    </table>

</template>

<script>

	// services
	import { portService } from 'services';

	export default {

		data() {
			return {

				// contain the registered ports listing
				// @type {Array}
				'ports': false

			}
		},

		route: {

			data() {
				return this.findRegisteredPorts();
			}

		},

		methods: {

			/**
			 * find the listing of registered ports server side
			 *
			 * @return {Promise}
			 *
			 * @author shad
			 */
			findRegisteredPorts() {

				return portService.find()
				.then( ports => ( { ports } ) )
				.catch( this.handlingErrors );

			}

		}

	}

</script>
