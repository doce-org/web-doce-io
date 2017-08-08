<template>
  
    <div class="column">

        <div class="tile is-ancestor">

            <div class="tile is-vertical">

                <div class="tile is-12 is-parent">

                    <automation></automation>

                </div>

                <div class="tile">

                    <div class="tile is-4 is-parent">

                        <today></today>

                    </div>

                    <div class="tile is-4 is-parent">

                        <temperature></temperature>

                    </div>

                    <div class="tile is-4 is-parent">

                        <humidity></humidity>

                    </div>

                </div>

                <div class="tile">


                    <div class="tile is-4 is-parent">

                        <power></power>

                    </div>

                    <div class="tile is-4 is-parent">

                        <debug></debug>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    // components
    import Today from './Others/Today.vue';
    import Temperature from './Temperature/Temperature.vue';
    import Humidity from './Humidity/Humidity.vue';
    import Power from './Power/Power.vue';
    import Automation from './Automation/Automation.vue';
    import Debug from 'components/Debug/Widget/Debug.vue';

    export default {

        components: {

            Automation,
            Today,
            Temperature,
            Humidity,
            Power,
            Debug

        }
    
    }
    
</script>

<style lang="scss" scoped>

    .column {
        height: 100vh;
        padding: 3em !important;
        overflow-y: auto;
    }

</style>

