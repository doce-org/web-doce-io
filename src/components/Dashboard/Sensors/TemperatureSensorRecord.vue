<template>

    <div>{{record.temperature || '...'}} °C</div>

</template>

<script type="text/babel">

    // services
    import { temperatureSensorRecordService } from 'services';

    export default {

        props: [ 'sensor_id' ],

        data() {
            return {
                record: {}
            }
        },

        created() {
            this.getLastTemperatureRecord();
            this.updateLastTemperatureRecord();
        },

        methods: {

            /**
             * get the last temperature record
             * @author shad
             */
            getLastTemperatureRecord() {
                temperatureSensorRecordService.find( { query: { 
                        temperature_sensor_id: this.sensor_id, 
                        $limit: 1, 
                        $sort: { created_at: -1 } 
                    } } )
                    .then( record => this.record = record[ 0 ] || {} )
                    .catch( console.error );
            },

            /**
             * update record temperature each time a new one
             * comes up - check if same as current component
             * @author shad
             */
            updateLastTemperatureRecord() {
                temperatureSensorRecordService.on( 'created', record => {
                    if ( this.record.temperature_sensor_id === record.temperature_sensor_id ) {
                        this.record = record;
                    }
                } );
            }

        }
    }

</script>