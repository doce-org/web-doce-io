<template>

	<form v-on:submit.prevent="save" class="ui form">

		<div v-for="port in ports" class="ui segment">
			<div v-if="port">
				{{port.manufacturer}}
				{{port.product}}
				{{port.serial_number}}
			</div>
		</div>


        <button class="ui orange basic button" type="submit">Sauvegarder</button>
        <a v-link="{name: 'rooms_list'}" class="ui red basic button">Annuler</a>

    </form>

</template>

<script>

	// services
	import { portService } from 'services';

	export default {

		data() {
			return {
				ports: false
			}
		},

		ready() {
			this.listConnectedPorts();
		},

		methods: {

			listConnectedPorts() {
				portService.find( { query: { listConnectedsSerialPorts: true } } )
					.then( ports => {
						this.ports = ports;
					} )
					.catch( console.err );
			},

			save() {

			}

		}

	}

</script>
