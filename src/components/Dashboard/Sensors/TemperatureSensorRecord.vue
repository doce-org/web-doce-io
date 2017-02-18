<template>

    <div>
		{{record.temperature || '...'}} °C
	</div>

</template>

<script type="text/babel">

    // services
    import { temperatureSensorRecordService } from 'services';

    export default {

        props: [

			// contain the hardware id
			// @type {Integer}
			'hardware_id'

		],

        data() {
            return {

				// contain the current last record
				// @type {Object}
                'record': {}

            }
        },

        created() {
            this.getLastTemperatureRecord();
            this.updateLastTemperatureRecord();
        },

        methods: {

            /**
             * get the last temperature recorded
             *
             * @author shad
             */
            getLastTemperatureRecord() {

				const query = { query: {

					// linked to current hardware id
                    hardware_id: this.hardware_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                temperatureSensorRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( console.error );

            },

            /**
             * update record temperature each time a new one
             * comes up - check if same as current component
             *
             * @on /temperatures/sensors/records
             * @event created
             *
             * @author shad
             */
            updateLastTemperatureRecord() {

                temperatureSensorRecordService.on( 'created', record => {

					// make sure it's the same hardware id we're receiving data from
                    if ( this.record.hardware_id === record.hardware_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
