<template>

    <div class="sixteen wide column">

        <div class="ui basic segment">
            <h5 class="ui disabled header">THERMOSTAT</h5>
        </div>

        <form v-on:submit.prevent="send" class="ui form">

            <div class="fields">

                <div class="required field">
                    <label>Valeur</label>
                    <input v-model="command.value" type="text">
                </div>

            </div>

            <button type="submit" class="ui basic blue button">Envoyer</button>

        </form>

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

                console.log( 'ouep' );

                serialService.create( { command: 'send', value: this.command.value } )
                .catch( this.handlingErrors );

            }

        }

    }

</script>

<style lang="scss" scoped>

	// column style
	.column {
		background: #eff2f8;
	}

</style>
