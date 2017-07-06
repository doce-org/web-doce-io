<template>

    <div>
		{{record.power || '...'}} W
	</div>

</template>

<script type="text/babel">

    // services
    import { transmitterPowerRecordService } from 'services';

    export default {

        props: [

			// contain the transmitter id
			// @type {Integer}
			'transmitter_id'

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

					// linked to current transmitter id
                    transmitter_id: this.transmitter_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                transmitterPowerRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( this.handlingErrors );

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

                transmitterPowerRecordService.on( 'created', record => {

					// make sure it's the same transmitter id we're receiving data from
                    if ( this.record.transmitter_id === record.transmitter_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
