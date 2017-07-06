<template>

    <nav class="ui left fixed inverted vertical labeled icon menu">

        <div class="item header">
            <i v-bind:class="{'green': serial_is_open, 'red': !serial_is_open}" class="plug icon"></i>
        </div>

		<!-- dashboard -->
        <a v-link="{name: 'dashboard', exact: true}" class="item">
            <i class="icon home"></i>
            Dashboard
        </a>

		<!-- consumation -->
        <a href="#" class="item disabled">
            <i class="icon dashboard"></i>
            Consommations
        </a>

		<!-- temperatures -->
        <a v-link="{name: 'history', exact: true}" class="item">
            <i class="icon bar chart"></i>
            Historique
        </a>

		<!-- analyzing -->
        <a href="#" class="item disabled">
            <i class="icon pie chart"></i>
            Analyse
        </a>

		<!-- relations -->
        <a href="#" class="item disabled">
            <i class="icon exchange"></i>
            Mise en relation
        </a>

		<!-- regulate -->
        <a href="#" class="item disabled">
            <i class="icon adjust"></i>
            Régulation
        </a>

		<!-- settings -->
        <a v-link="{name: 'settings'}" class="item">
            <i class="setting icon"></i>
            Paramètres
        </a>

		<!-- help -->
        <a class="item disabled">
            <i class="help icon"></i>
            Aide
        </a>

    </nav>

</template>

<script>

    // services
    import { serialService } from 'services';

    export default {

        data() {
            return {

                // contain the current serial connection
                // @type {Boolean}
                'serial_is_open': false,

                // contain the throttled function to try
                // to open a serial connection
                // @type {Function}
                'try_connection_interval': false

            }
        },
    
        created() {
            this.findCurrentSerialConnection();
            this.onSerialConnectionEvents();
        },

        watch: {

            /**
             * watch the value change to either try to open the serial connection, 
             * or stop from trying when successfully opened
             * 
             * @author shad
             */ 
            'serial_is_open': {
                immediate: true,
                handler( is_open ) {

                    // if the connection has been opened
                    // cancel retrying to open it every 15 sec.
                    if ( is_open && this.try_connection_interval ) {

                        clearInterval( this.try_connection_interval );

                    }

                    else {

                        // if the connection isn't open, try to open it
                        // every 15 secondes until success
                        this.try_connection_interval = setInterval( this.openSerialConnection, 10000 ); //15000 );

                    }

                }
            }

        },

        methods: {

            /**
             * find the current serial connection
             * 
             * @author shad
             */ 
            findCurrentSerialConnection() {

                serialService.find()
                .then( serial => this.serial_is_open = serial.is_open )
                .catch( this.handlingErrors );

            },

            /**
             * handle serial connection events
             * 
             * @author shad
             */ 
            onSerialConnectionEvents() {

                // on connection opened event
                serialService.on( 'open', () => {

                    this.serial_is_open = true;

                } );

                // on connection closed event
                serialService.on( 'closed', res => {

                    this.serial_is_open = false;

                } );

            },

            /**
             * open the serial connection
             * 
             * @author shad
             */ 
            openSerialConnection() {

                serialService.create( {} )
                .catch( this.handlingErrors );

            }

        }

    }

</script>


<style lang="scss" scoped>

	// special side menu styling
	.menu {
		margin-bottom: 0;

		.active {
			border-left: 4px solid #3498db;
		}
	}

</style>
