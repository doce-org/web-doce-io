'use strict';

import Setup from 'components/Setup/Setup.vue';
import Menu from 'components/Setup/Menu.vue';
// rooms
import RoomsListing from 'components/Setup/Rooms/RoomsListing.vue';
import RoomForm from 'components/Setup/Rooms/RoomForm.vue';
// transmitters
import HardwaresListing from 'components/Setup/Hardwares/HardwaresListing.vue';
import HardwareForm from 'components/Setup/Hardwares/HardwareForm.vue';

export default {

    '/setup': {
        component: Setup,
        subRoutes: {

            // menu
            '/': { name: 'setup', component: Menu },

            // rooms
            '/rooms': { name: 'setup_rooms_listing', component: RoomsListing },
            '/rooms/create': { name: 'setup_room_create', component: RoomForm },

            // hardwares
            '/hardwares': { name: 'setup_hardwares_listing', component: HardwaresListing },
            '/rooms/:roomid/hardwares/create': { name: 'setup_root_hardware_create', component: HardwareForm },
            '/rooms/:roomid/hardwares/:parentid/create': { name: 'setup_hardware_create', component: HardwareForm }

        }
    }

}
