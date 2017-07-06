<template>
  
    <div class="column">

        <h3 class="ui disabled header">{{room.name}}</h3>
		<!-- TODO add back room icon / image -->
        <!-- <img class="ui small centered image" :src="room.room_icon.image" alt="room icon"> -->

        <nav class="ui secondary fluid four item menu">
            <a class="active item" data-tab="temperature">
                <img src="/static/img/type/thermometer.png">
            </a>
            <a class="item" data-tab="humidity">
                <img src="/static/img/type/humidity.png">
            </a>
            <a class="item" data-tab="energy">
                <img src="/static/img/type/energy.png">
            </a>
            <a class="item" data-tab="water">
                <img src="/static/img/type/water.png">
            </a>
        </nav>

        <div class="ui tab active basic segment" data-tab="temperature">
            <temperatures-sensors :room_id="room.id"></temperatures-sensors>
        </div>
        <div class="ui tab basic segment" data-tab="humidity">
            <humidities-sensors :room_id="room.id"></humidities-sensors>
        </div>
        <div class="ui tab basic segment" data-tab="energy">
            <power-meters :room_id="room.id"></power-meters>
        </div>
        <div class="ui tab basic segment" data-tab="water">
            <water-meters :room_id="room.id"></water-meters>
        </div>

    </div>

</template>

<script>

    // components
    import TemperaturesSensors from './Sensors/TemperaturesSensors.vue';
    import HumiditiesSensors from './Sensors/HumiditiesSensors.vue';
    import PowerMeters from './Meters/PowerMeters.vue';
    import WaterMeters from './Meters/WaterMeters.vue';

    export default {

        props: [

            // contain the room object
            // @type {Object}
            'room'

        ],

        components: {

            TemperaturesSensors,
			HumiditiesSensors,
			PowerMeters,
			WaterMeters

        },

        ready() {
            $( '.ui.secondary.menu .item', this.$el ).tab();
        }
    
    }

</script>

<style lang="scss" scoped>

    // room header
    .disabled.header {
        text-transform: uppercase;
    }

    // menu styles
    .ui.secondary.menu {

        .item {
            background: none;

            // reduce opacity when not active
            img {
                opacity: 0.3;
            }

            // full opacity on active img
            &.active > img {
                opacity: 1;
            }
        }
    }

</style>


