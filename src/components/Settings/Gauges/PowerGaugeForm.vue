<template>

    <form v-on:submit.prevent="save" class="ui form">

        <!-- name -->
        <div class="field">
            <label>Nom</label>
            <input v-model="gauge.name" type="text" placeholder="Nom de la jauge">
        </div>

        <!-- gauge -->
        <div class="field">
            <label>Jauge</label>
            <div class="ui selection search dropdown">
                <input v-model="gauge.hardware_id" type="hidden">
                <div class="default text">Selectionner une jauge disponible</div>
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div v-for="hardware in hardwares" class="item" data-value="{{hardware.hardware_id}}">{{hardware.hardware_id}}</div>
                </div>
            </div>
        </div>

        <!-- rooms -->
        <div class="field">
            <label>Pièce</label>
            <div class="ui selection search dropdown">
                <input v-model="gauge.room_id" type="hidden">
                <div class="default text">Appartient a la pièce...</div>
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div v-for="room in rooms" class="item" data-value="{{room.id}}">{{room.name}}</div>
                </div>
            </div>
        </div>

        <button class="ui orange basic button" type="submit">Sauvegarder</button>
        <a v-link="{name: 'powers_gauges_list'}" class="ui red basic button">Annuler</a>

    </form>

</template>

<script type="text/babel">

    import { roomService, powerGaugeService, newHardwareService } from 'services';

    export default {

        data() {
            return {
                rooms: [],
                hardwares: [],
                gauge: {}
            }
        },

        created() {
            this.getRoomsListing();
            this.getAvailableHardwareListing();
        },

        ready() {
            $( '.ui.dropdown', this.$el ).dropdown();
        },

        methods: {

            /**
             * get all available hardware for the TEMP type
             * @author shad
             */
            getAvailableHardwareListing() {
                newHardwareService.find( { query: { type: 'POWER' } } )
                    .then( hardwares => this.hardwares = hardwares )
                    .catch( console.error );
            },

            /**
             * get available rooms listing
             * @author shad
             */
            getRoomsListing() {
                roomService.find()
                    .then( rooms => this.rooms = rooms )
                    .catch( console.error )
            },

            /**
             * create or update a sensor
             * @author shad
             */
            save() {
                powerGaugeService.create( this.gauge )
                    .then( () => this.$router.go( { name: 'powers_gauges_list' } ) )
                    .catch( console.error )
            }

        }
    }

</script>