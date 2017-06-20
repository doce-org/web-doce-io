'use strict';

import Settings from 'components/Settings/Settings.vue';

// rooms
import RoomsList from 'components/Settings/Rooms/RoomsList.vue';
import RoomForm from 'components/Settings/Rooms/RoomForm.vue';

import HardwaresList from 'components/Settings/Hardwares/HardwaresList.vue';
import HardwareForm from 'components/Settings/Hardwares/HardwareForm.vue';

export default {

    '/settings': {
        name: 'settings',
        component: Settings,
        subRoutes: {

			// rooms
            '/rooms': { name: 'rooms_list', component: RoomsList },
            '/rooms/add': { name: 'room_add', component: RoomForm },

			// hardwares
            '/hardwares': { name: 'hardwares_list', component: HardwaresList },
            '/hardwares/add': { name: 'hardware_form', component: HardwareForm }

        }
    }

}
