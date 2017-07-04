'use strict';

import Setup from 'components/Setup/Setup.vue';
import Menu from 'components/Setup/Menu.vue';
// rooms
import RoomsListing from 'components/Setup/Rooms/RoomsListing.vue';
import RoomForm from 'components/Setup/Rooms/RoomForm.vue';
// transmitters
import TransmittersListing from 'components/Setup/Transmitters/TransmittersListing.vue';
import TransmitterForm from 'components/Setup/Transmitters/TransmitterForm.vue';

export default {

    '/setup': { 
        component: Setup,
        subRoutes: {

            // menu
            '/': { name: 'setup', component: Menu },

            // rooms
            '/rooms': { name: 'setup_rooms_listing', component: RoomsListing },
            '/rooms/create': { name: 'setup_room_create', component: RoomForm },

            // transmitters
            '/transmitters': { name: 'setup_transmitters_listing', component: TransmittersListing },
            '/transmitters/create': { name: 'setup_transmitter_create', component: TransmitterForm }

        } 
    }

}