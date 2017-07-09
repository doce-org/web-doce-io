<template>
  
    <div class="ui two item menu">

        <!-- current serial connexion status -->
        <div class="ui icon item">
            <i v-bind:class="{'green': serial_is_open, 'red': !serial_is_open}" class="plug icon"></i>
        </div>

        <!-- current server connexion status -->
        <div class="ui icon item">
            <i v-bind:class="{'green': server_is_connected, 'red': !server_is_connected}" class="server icon"></i>
        </div>

    </div>

</template>

<script>

    // services
    import { feathers_socket, serialService } from 'services';

    export default {

        data() {
            return {

                // contain the current serial connection
                // @type {Boolean}
                'serial_is_open': false,

                // contain the throttled function to try
                // to open a serial connection
                // @type {Function}
                'try_connexion_interval': false,

                // contain the current connexion to the
                // API server on the raspberry
                'server_is_connected': false

            }
        },
    
        created() {
            this.findCurrentSerialConnection();
            this.onSerialConnectionEvents();
            this.handleServerConnexionEvents();
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
                    if ( is_open && this.try_connexion_interval ) {

                        clearInterval( this.try_connexion_interval );

                    }

                    else {

                        // if the connection isn't open, try to open it
                        // every 15 secondes until success
                        this.try_connexion_interval = setInterval( this.openSerialConnection, 10000 ); //15000 );

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

            },

            /**
             * handle server connexion status
             * 
             * @author shad
             */ 
            handleServerConnexionEvents() {

                feathers_socket.io
				.on( 'connect', () => this.server_is_connected = true )
				.on( 'reconnect', () => this.server_is_connected = true )
				.on( 'disconnect', () => this.server_is_connected = false );

            }

        }

    }

</script>


<style lang="scss" scoped>

    // special menu styles
    .ui.menu {
        height: 40px;
        background: #EFF2F8;
        margin: 0;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid rgba( 34, 36, 38, .10 );
        border-radius: 0;
        box-shadow: none;

        .item {
            padding-top: 0;
            padding-bottom: 0;
        }
    }

</style>

