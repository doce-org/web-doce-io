<template>

    <div v-for="room in rooms" class="ui padded grid">

        <div class="sixteen wide column">
            <h3 class="ui disabled header">{{room.name}}</h3>
			<!-- TODO add back room icon / image -->
            <!-- <img class="ui small centered image" :src="room.room_icon.image" alt="room icon"> -->
        </div>

		<!-- temperatures -->
        <div class="four wide column">

            <temperatures-sensors :room_id="room.id"></temperatures-sensors>

        </div>

		<!-- humidities -->
        <div class="four wide column">

            <humidities-sensors :room_id="room.id"></humidities-sensors>

        </div>

		<!-- power -->
        <div class="four wide column">

            <power-meters :room_id="room.id"></power-meters>

        </div>

		<!-- water -->
        <div class="four wide column">

            <water-meters :room_id="room.id"></water-meters>

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
    import HumiditiesSensors from './Sensors/HumiditiesSensors.vue';
    import PowerMeters from './Meters/PowerMeters.vue';
    import WaterMeters from './Meters/WaterMeters.vue';

    export default {

        components: {

			TemperaturesSensors,
			HumiditiesSensors,
			PowerMeters,
			WaterMeters

		},

        data() {
            return {

				// contain the rooms listing returned by the server
				// @type {Array}
                'rooms': []

            }
        },

        created() {
            this.getRoomsListing();
        },

        methods: {

            /**
             * get the rooms listing
             *
             * @author shad
             */
            getRoomsListing() {

                roomService.find()
                    .then( rooms => this.rooms = rooms )
                    .catch( this.handlingErrors );

            }

        }

    }

</script>

<style lang="scss" scoped>

	// room header
    .disabled.header {
        text-transform: uppercase;
    }

</style>
