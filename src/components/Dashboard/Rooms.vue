<template>

    <div v-for="room in rooms" class="ui padded grid">

        <div class="three wide column">
            <h3 class="ui disabled header">{{room.name}}</h3>
            <img class="ui small centered image" :src="room.room_icon.image" alt="room icon">
        </div>

        <div class="four wide column">

            <!-- temperatures -->
            <temperatures-sensors :room_id="room.id"></temperatures-sensors>

        </div>

        <div class="four wide column">

            <!-- power -->
            <power></power>

        </div>

        <div class="five wide column">

            <!-- automation -->
            <automation></automation>

        </div>

        <div class="sixteen wide column">
            <div class="ui divider"></div>
        </div>

    </div>

</template>

<script type="text/babel">

    // services
    import { roomService } from 'services';
    // components
    import TemperaturesSensors from './Sensors/TemperaturesSensors.vue';
    import Power from './Gauges/Power.vue';
    import Automation from './Controls/Automation.vue';

    export default {

        components: { TemperaturesSensors, Power, Automation },

        data() {
            return {
                rooms: []
            }
        },

        created() {
            this.getRoomsListing();
        },

        methods: {

            /**
             * get the rooms listing
             * @author shad
             */
            getRoomsListing() {
                roomService.find()
                    .then( rooms => this.rooms = rooms )
                    .catch( console.error );
            }

        }

    }

</script>

<style lang="scss" scoped>

    .disabled.header {
        text-transform: uppercase;
    }

</style>