<template>
  
    <div class="column">

        <div class="tile is-ancestor">

            <div class="tile is-vertical">

                <div class="tile is-12 is-parent">

                    <automation></automation>

                </div>


                <div class="tile is-12 is-parent">

                    <temperature></temperature>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    // components
    import Temperature from './Temperature/Temperature.vue';
    import Automation from './Automation/Automation.vue';

    export default {

        components: {

            Automation,
            Temperature

        }
    
    }
    
</script>

<style lang="scss" scoped>

    .column {
        background: #e7ebee;
        height: 100vh;
        padding: 3em !important;
    }

</style>

