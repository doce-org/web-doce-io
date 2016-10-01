<template>

    <form v-on:submit.prevent="save" class="ui form">

        <!-- name -->
        <div class="field">
            <label>Nom</label>
            <input v-model="room.name" type="text" placeholder="Nom de la pièce">
        </div>

        <!-- image -->
        <div class="field">
            <label>Image</label>
            <div class="ui selection dropdown">
                <input v-model="room.room_icon_id" type="hidden">
                <div class="default text">Image présentative de la pièce</div>
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div v-for="room_icon in room_icons" class="item" data-value="{{room_icon.id}}">
                        <img class="ui large image" :src="room_icon.image">{{room_icon.name}}
                    </div>
                </div>
            </div>
        </div>

        <button class="ui orange basic button" type="submit">Sauvegarder</button>
        <a v-link="{name: 'rooms_list'}" class="ui red basic button">Annuler</a>

    </form>

</template>

<script type="text/babel">

    import { roomService, roomIconService } from 'services';

    export default {

        data() {
            return {
                room: {},
                room_icons: []
            }
        },

        created() {
            this.getIconsListing();
        },
            
        ready() {
            $( '.ui.dropdown', this.$el ).dropdown();
        },

        methods: {

            /**
             * get rooms icons listing
             * @author shad
             */
            getIconsListing() {
                roomIconService.find()
                    .then( icons => this.room_icons = icons )
                    .catch( console.error );
            },

            /**
             * create or update a room
             * @author shad
             */
            save() {
                roomService.create( this.room )
                    .then( this.$router.go( { name: 'rooms_list' } ) )
                    .catch( console.error )
            }

        }
    }

</script>