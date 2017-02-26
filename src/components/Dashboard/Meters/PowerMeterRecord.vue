<template>

    <div>
		{{record.power || '...'}}
		{{record.energy || '...'}}
	</div>

</template>

<script type="text/babel">

    // services
    import { powerMeterRecordService } from 'services';

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
            this.getLastPowerRecorded();
            this.updateLastPowerRecord();
        },

        methods: {

            /**
             * get the last power recorded
             *
             * @author shad
             */
            getLastPowerRecorded() {

				const query = { query: {

					// linked to current hardware id
                    hardware_id: this.hardware_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                powerMeterRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( console.error );

            },

            /**
             * update power record each time a new one
             * comes up - check if same as current component
             *
             * @on /powers/sensors/records
             * @event created
             *
             * @author shad
             */
            updateLastPowerRecord() {

                powerMeterRecordService.on( 'created', record => {

					// make sure it's the same hardware id we're receiving data from
                    if ( this.record.hardware_id === record.hardware_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
