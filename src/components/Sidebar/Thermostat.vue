<template>

    <div id="thermostat" class="column">

        <h6 class="title is-6 has-text-right is-inverted">THERMOSTAT</h6>

        <!-- <form v-on:submit.prevent="send" class="ui form">

            <div class="fields">

                <div class="required field">
                    <label>Valeur</label>
                    <input v-model="command.value" type="text">
                </div>

            </div>

            <button type="submit" class="ui basic blue button">Envoyer</button>

        </form> -->

    </div>

</template>

 <script type="text/babel">
 
    // services
    import { serialService } from 'services';

    export default {

        data() {
            return {

                'command': {}

            }
        },

        methods: {

            send() {

                serialService.create( { command: 'send', value: this.command.value } )
                .catch( this.handlingErrors );

            }

        }

    }

</script>

<style lang="scss">

    #thermostat {

		h6 {
			color: white;
            font-weight: 400;
		}
	}

</style>
