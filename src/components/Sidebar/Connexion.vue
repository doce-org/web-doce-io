<template>
  
    <div id="connexion" class="column is-narrow is-paddingless">

        <div class="columns is-gapless">

            <div class="column">
                <span class="icon">
					<i v-bind:class="{'green': serial_is_open, 'red': !serial_is_open}" class="fa fa-plug"></i>
				</span> 
            </div>
            <div class="column">
                <span class="icon">
					<i v-bind:class="{'green': server_is_connected, 'red': !server_is_connected}" class="fa fa-server"></i>
				</span> 
            </div>
            <div v-on:click="showMenu" class="column">
                <span class="icon">
					<i class="fa fa-bars"></i>
				</span> 
            </div>

        </div>

        <menu v-if="menu_is_visible" @closing="showMenu"></menu>

    </div>

</template>

<script>

    // services
    import { feathers_socket, serialService } from 'services';
    // components
    import Menu from '../Menu.vue';

    export default {

        components: {

            Menu

        },

        data() {
            return {

                // contain the current serial connection
                // @type {Boolean}
                'serial_is_open': false,

                // contain the current connexion to the
                // API server on the raspberry
                'server_is_connected': false,

                // contain bool. to know if showing menu
				// @type {Boolean}
				'menu_is_visible': false

            }
        },
    
        created() {
            this.handleServerConnexionEvents();
            this.findCurrentSerialConnection();
            this.onSerialConnectionEvents();
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
				.on( 'reconnect', () => {

                    this.server_is_connected = true;
                    this.findCurrentSerialConnection();

                } )
				.on( 'disconnect', () => {

                    this.server_is_connected = false;
                    this.serial_is_open = false;

                } );

            },

            /**
			 * alternate menu visibility
			 *
			 * @author shad
			 */
			showMenu() {

				this.menu_is_visible = !this.menu_is_visible;

			}

        }

    }

</script>


<style lang="scss" scoped>

    // special menu styles
    #connexion {
        height: 45px;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid #313c4d;

        .column {
            text-align: center;
            padding-top: 10px;
            padding-bottom: 10px;

            &:not(:last-child) {
                border-right: 1px solid #313c4d;
            }

            .icon > i {
                color: white;

                &.green {
                    color: #91DC5A;
                }

                &.red {
                    color: red;
                }
            }

            &:last-child {
                cursor: pointer;
            }
        }
    }

</style>

