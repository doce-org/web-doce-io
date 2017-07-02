<template>

    <div>
		{{record.water || '...'}}
	</div>

</template>

<script type="text/babel">

    // services
    import { transmitterWaterRecordService } from 'services';

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
            this.getLastWaterRecorded();
            this.updateLastWaterRecord();
        },

        methods: {

            /**
             * get the last power recorded
             *
             * @author shad
             */
            getLastWaterRecorded() {

				const query = { query: {

					// linked to current transmitter id
                    transmitter_id: this.transmitter_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                transmitterWaterRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( this.handlingErrors );

            },

            /**
             * update power record each time a new one
             * comes up - check if same as current component
             *
             * @on /waters/sensors/records
             * @event created
             *
             * @author shad
             */
            updateLastWaterRecord() {

                transmitterWaterRecordService.on( 'created', record => {

					// make sure it's the same transmitter id we're receiving data from
                    if ( this.record.transmitter_id === record.transmitter_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
