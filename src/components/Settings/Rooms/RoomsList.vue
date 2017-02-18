<template>

	<div class="ui padded grid">

		<div class="sixteen wide column">

			<h2 class="ui blue light header">
				<i class="circle icon"></i>
				Listes des Pièces
			</h2>

		</div>

		<div class="sixteen wide column">
			<div class="ui segment">
				<table class="ui very basic selectable table">

					<thead>
						<tr>
							<th>Nom</th>
							<th>Image</th>
							<th class="collapsing">

								<!-- add a room -->
								<a v-link="{name: 'room_add'}" class="ui green basic button">
									Ajouter une pièce
								</a>

							</th>
						</tr>
					</thead>

					<tbody>

						<tr v-for="room in rooms">

							<!-- name -->
							<td>{{room.name}}</td>

							<!-- icon / image -->
							<td>
								<!-- <img class="ui tiny image" v-bind:src="room.room_icon.image" alt="room icon"> -->
							</td>

							<td class="single line">

								<!-- informations -->
								<a v-link="" class="ui blue basic button disabled">
									Informations
								</a>

								<!-- edit -->
								<a v-link="" class="ui orange basic button disabled">
									Modifier
								</a>

							</td>

						</tr>

					</tbody>
				</table>
			</div>

		</div>

	</div>


</template>

<script type="text/babel">

	// services
    import { roomService } from 'services';

    export default {

        data() {
            return {

				// contain the listing of rooms returned by the server
				// @type {Array}
                'rooms': []

            }
        },

		route: {

			data() {
				return this.findRooms();
			}

		},

        methods: {

            /**
             * find all registered rooms
             *
             * @return {Promise}
             *
             * @author shad
             */
            findRooms() {

                return roomService.find()
                .then( rooms => ( { rooms } ) )
                .catch( console.error )

            }

        }
    }

</script>
