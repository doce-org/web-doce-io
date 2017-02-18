<template>

	<div class="ui padded grid">

		<div class="sixteen wide column">

			<h2 v-if="room_id" class="ui orange light header">
				<i class="write icon"></i>
				Editer une Piece
			</h2>

			<h2 v-else class="ui green light header">
				<i class="plus icon"></i>
				Ajouter une Piece
			</h2>

		</div>

		<div class="sixteen wide column">
			<form v-on:submit.prevent="save" class="ui form">

				<div class="fields">

					<!-- name -->
					<div class="field required">
						<label>Nom</label>
						<input v-model="room.name" type="text" placeholder="Nom de la pièce">
					</div>

				</div>

				<div class="ui divider"></div>

				<!-- edit mode -->
		        <button v-if="room_id" class="ui orange basic button" type="submit">
					<i class="write icon"></i>
					Sauvegarder
				</button>

				<!-- create mode -->
		        <button v-else class="ui green basic button" type="submit">
					<i class="plus icon"></i>
					Sauvegarder
				</button>

				<!-- cancel -->
		        <a v-link="{name: 'rooms_list'}" class="ui red basic button">
					Annuler
				</a>

		    </form>
		</div>

	</div>

</template>

<script type="text/babel">

	// services
    import { roomService } from 'services';

    export default {

        data() {
            return {

				// contain the room id
				// @type {Integer}
				'room_id': false,

				// contain the room object
				// @type {Object}
                'room': {}

            }
        },

        methods: {

            /**
             * create or update a room
             *
             * @author shad
             */
            save() {

                roomService.create( this.room )
                .then( this.$router.go( { name: 'rooms_list' } ) )
                .catch( console.error );

            }

        }
    }

</script>
