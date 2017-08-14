<template>

    <div class="columns is-gapless is-centered is-vcentered">
        <div class="column is-half is-narrow">

            <div class="level">
                <div class="level-left">
                    <div class="level-item">

                        <!-- go back to setup menu -->
                        <a v-link="{name: 'setup'}" class="button is-outlined is-info">
                            <span class="icon is-small">
                                <i class="fa fa-arrow-left"></i>
                            </span>
                        </a>

                    </div>
                    <div class="level-item">
                        <h5 class="subtitle is-5">Liste des materiels.</h5>
                    </div>
                </div>
            </div>

			<div class="columns is-multiline">

				<!-- each rooms -->
				<div v-for="room in rooms" class="column is-12">

					<!-- room -->
					<div v-on:click="this.current_room_id = room.id" class="level">
						<div class="level-left">
							<div class="level-item">{{room.name}}</div>
						</div>
						<div class="level-right">
							<div class="level-item">
								<button v-link="{name: 'setup_root_hardware_create', params: {roomid: room.id}}" class="button is-success is-outlined is-small">
									<span class="icon is-small"><i class="fa fa-plus"></i></span>
								</button>
							</div>
						</div>
					</div>

					<!-- show nested hardwares when selected -->
					<hardwares-listing-item v-if="current_room_id === room.id"
						parent_type="room" 
						:parent_id="room.id"
						:room_id="room.id">
					</hardwares-listing-item>

				</div>

			</div>

        </div>
    </div>

</template>

<script>

    // services
    import { roomService } from 'services';
	// components
	import HardwaresListingItem from './HardwaresListingItem.vue';

    export default {

		components: {

			HardwaresListingItem

		},

        data() {
            return {

				// contain the rooms listing
				// @type {Array}
				'rooms': false,

				// contain the currently expanded room id
				// @type {Integer}
				'current_room_id': false

            }
        },

        created() {
			this.findRooms();
        },

        methods: {

			/**
			 * find the listing of available rooms
			 *
			 * @author shad
			 */
			findRooms() {

				roomService.find()
				.then( rooms => this.rooms = rooms )
				.catch( this.handlingErrors );

			}

        }

    }

</script>

<style lang="scss" scoped>

    .level {

    }

</style>
