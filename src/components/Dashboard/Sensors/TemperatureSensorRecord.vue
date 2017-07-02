<template>

    <div>
		{{record.temperature || '...'}} °C
	</div>

</template>

<script type="text/babel">

    // services
    import { transmitterTemperatureRecordService } from 'services';

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

					// linked to current transmitter id
                    transmitter_id: this.transmitter_id,

					// limit to one
                    $limit: 1,

					// sort to get only the last one
                    $sort: { created_at: -1 }

                } };

                transmitterTemperatureRecordService.find( query )
                .then( record => this.record = record[ 0 ] || {} )
                .catch( this.handlingErrors );

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

                transmitterTemperatureRecordService.on( 'created', record => {

					// make sure it's the same transmitter id we're receiving data from
                    if ( this.record.transmitter_id === record.transmitter_id ) {

                        this.record = record;

                    }

                } );

            }

        }
    }

</script>
