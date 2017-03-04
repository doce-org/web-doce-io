<template>

    <div>
		{{record.temperature || '...'}} °C - {{record.humidity || '...'}} %
	</div>

</template>

<script type="text/babel">

    // services
    import { humiditySensorRecordService } from 'services';

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
            this.getLastHumidityRecord();
            this.updateLastHumidityRecord();
        },

        methods: {

            /**
             * get the last humidity recorded
             *
             * @author shad
             */
            getLastHumidityRecord() {

				const query = { query: {

					// linked to current hardware id
                    hardware_id: this.hardware_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                humiditySensorRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( console.error );

            },

            /**
             * update record humidity each time a new one
             * comes up - check if same as current component
             *
             * @on /humidities/sensors/records
             * @event created
             *
             * @author shad
             */
            updateLastHumidityRecord() {

                humiditySensorRecordService.on( 'created', record => {

					// make sure it's the same hardware id we're receiving data from
                    if ( this.record.hardware_id === record.hardware_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
