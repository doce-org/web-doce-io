<template>

    <table class="ui very basic selectable table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th class="collapsing">
                    <a v-link="{name: 'power_gauge_form'}" class="ui green basic button">Ajouter une sonde</a>
                </th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="power in powers">
                <td>{{power.id}}</td>
                <td>{{power.name}}</td>
                <td class="single line">
                    <a v-link="" class="ui blue basic button disabled">Informations</a>
                    <a v-link="" class="ui orange basic button disabled">Modifier</a>
                </td>
            </tr>

        </tbody>
    </table>

</template>

<script type="text/babel">

    import { powerGaugeService } from 'services';

    export default {

        data() {
            return {
                powers: []
            }
        },

        created() {
            this.getPowerGaugesListing();
        },

        methods: {

            /**
             * get power gauges listing
             * @author shad
             */
            getPowerGaugesListing() {
                powerGaugeService.find()
                    .then( powers => this.powers = powers )
                    .catch( console.error );
            }

        }
    }

</script>