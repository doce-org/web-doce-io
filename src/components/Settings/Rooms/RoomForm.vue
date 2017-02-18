<template>

    <form v-on:submit.prevent="save" class="ui form">

        <!-- name -->
        <div class="field">
            <label>Nom</label>
            <input v-model="room.name" type="text" placeholder="Nom de la pièce">
        </div>

		<!-- save -->
        <button class="ui orange basic button" type="submit">
			<i class="plus icon"></i>
			Sauvegarder
		</button>

		<!-- cancel -->
        <a v-link="{name: 'rooms_list'}" class="ui red basic button">
			Annuler
		</a>

    </form>

</template>

<script type="text/babel">

	// services
    import { roomService } from 'services';

    export default {

        data() {
            return {

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
