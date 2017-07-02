<template>

    <div>
		{{record.temperature || '...'}} °C - {{record.humidity || '...'}} %
	</div>

</template>

<script type="text/babel">

    // services
    import { transmitterHumidityRecordService } from 'services';

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

					// linked to current transmitter id
                    transmitter_id: this.transmitter_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                transmitterHumidityRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( this.handlingErrors );

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

                transmitterHumidityRecordService.on( 'created', record => {

					// make sure it's the same transmitter id we're receiving data from
                    if ( this.record.transmitter_id === record.transmitter_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
