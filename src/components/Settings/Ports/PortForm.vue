<template>

	<form v-on:submit.prevent="save" class="ui form">

		<div v-for="port in ports" class="ui segment">
			<div v-if="port">
				{{port.comName}}
				{{port.manufacturer}}
				{{port.serialNumber}}
			</div>
		</div>


        <button v-on:click="listConnectedPorts" class="ui orange basic button" type="button">Recharger la liste</button>
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
				portService.find()
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
