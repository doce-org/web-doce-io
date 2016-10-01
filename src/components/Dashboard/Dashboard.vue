<template>

    <div id="dashboard" class="ui equal height padded grid">

        <section id="weather" class="three wide column">

            <!-- weather -->
            <weather></weather>

        </section>

        <!-- summary -->
        <section class="ten wide center aligned column">
            <nav class="ui secondary menu">
                <div class="header item">Récapitulatif</div>
                <div class="right menu">
                    <a class="ui active item">Instantanée</a>
                    <a class="ui item disabled">Heure</a>
                    <a class="ui item disabled">Jour</a>
                    <a class="ui item disabled">Mois</a>
                </div>
            </nav>
            <div class="ui divider"></div>

            <!-- rooms -->
            <rooms></rooms>
            
        </section>

        <section class="three wide stretched column" style="background: #eff2f8;">
            <div class="ui equal height grid">

                <!-- thermostat -->
                <thermostat></thermostat>

                <!-- activities -->
                <activity></activity>

            </div>
        </section>

    </div>

</template>

<script type="text/babel">

    // components
    import Rooms from './Rooms.vue';
    import Activity from './Others/Activity.vue';
    import Thermostat  from './Controls/Thermostat.vue';
    import Weather from './Others/Weather.vue';

    export default {
        components: { Rooms, Activity, Thermostat, Weather }
    }

</script>

<style lang="scss" scoped>

    #dashboard {
        height: 100vh;
    }

    #weather {
        padding: 0;
        background: #3498db;
    }

    .column {
        overflow-y: auto;
        overflow-x: hidden;
    }

</style>