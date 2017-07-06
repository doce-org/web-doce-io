<template>

    <div v-for="room in rooms" class="ui padded two column grid">

        <room :room="room"></room>

    </div>

</template>

<script type="text/babel">

    // services
    import { roomService } from 'services';
    // components
    import Room from './Room.vue';

    export default {

        components: {

            Room

		},

        data() {
            return {

				// contain the rooms listing returned by the server
				// @type {Array}
                'rooms': []

            }
        },

        created() {
            this.getRoomsListing();
        },

        methods: {

            /**
             * get the rooms listing
             *
             * @author shad
             */
            getRoomsListing() {

                roomService.find()
                    .then( rooms => this.rooms = rooms )
                    .catch( this.handlingErrors );

            }

        }

    }

</script>

<style lang="scss" scoped>

	

</style>
