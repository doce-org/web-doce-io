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

