'use strict';

import Settings from 'components/Settings/Settings.vue';

// ports
import Ports from 'components/Settings/Ports/Ports.vue';
import PortForm from 'components/Settings/Ports/PortForm.vue';

// rooms
import RoomsList from 'components/Settings/Rooms/RoomsList.vue';
import RoomForm from 'components/Settings/Rooms/RoomForm.vue';

import SensorsList from 'components/Settings/Sensors/SensorsList.vue';
import SensorForm from 'components/Settings/Sensors/SensorForm.vue';

import MetersList from 'components/Settings/Meters/MetersList.vue';
import MeterForm from 'components/Settings/Meters/MeterForm.vue';

export default {

    '/settings': {
        name: 'settings',
        component: Settings,
        subRoutes: {

			// rooms
            '/rooms': { name: 'rooms_list', component: RoomsList },
            '/rooms/add': { name: 'room_add', component: RoomForm },

			// ports
            '/ports': { name: 'ports_list', component: Ports },
            '/ports/add': { name: 'port_add', component: PortForm },

			// sensors
            '/sensors': { name: 'sensors_list', component: SensorsList },
            '/sensors/add': { name: 'sensor_form', component: SensorForm },

			// gauges
            '/powers/gauges': { name: 'meters_list', component: MetersList },
            '/powers/gauges/add': { name: 'meter_form', component: MeterForm }

        }
    }

}
