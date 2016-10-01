<template>

    <table class="ui very basic selectable table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th class="collapsing">
                    <a v-link="{name: 'temperatures_sensor_form'}" class="ui green basic button">Ajouter une sonde</a>
                </th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="temperature in temperatures">
                <td>{{temperature.id}}</td>
                <td>{{temperature.name}}</td>
                <td class="single line">
                    <a v-link="" class="ui blue basic button disabled">Informations</a>
                    <a v-link="" class="ui orange basic button disabled">Modifier</a>
                </td>
            </tr>

        </tbody>
    </table>

</template>

<script type="text/babel">

    import { temperatureSensorService } from 'services';

    export default {

        data() {
            return {
                temperatures: []
            }
        },

        created() {
            this.getTemperatureSensorsListing();
        },

        methods: {

            /**
             * get temperature sensors listing
             * @author shad
             */
            getTemperatureSensorsListing() {
                temperatureSensorService.find()
                    .then( temperatures => this.temperatures = temperatures )
                    .catch( console.error );
            }

        }
    }

</script>