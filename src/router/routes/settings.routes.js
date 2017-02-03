'use strict';

import Settings from 'components/Settings/Settings.vue';
// rooms
import RoomsList from 'components/Settings/Rooms/RoomsList.vue';
import RoomForm from 'components/Settings/Rooms/RoomForm.vue';
// ports
import PortsList from 'components/Settings/Ports/PortsList.vue';
import PortForm from 'components/Settings/Ports/PortForm.vue';

import TemperatureSensorsList from 'components/Settings/Sensors/TemperatureSensorsList.vue';
import TemperatureSensorForm from 'components/Settings/Sensors/TemperatureSensorForm.vue';
import PowerGaugesList from 'components/Settings/Gauges/PowerGaugesList.vue';
import PowerGaugeForm from 'components/Settings/Gauges/PowerGaugeForm.vue';

export default {
    '/settings': {
        name: 'settings',
        component: Settings,
        subRoutes: {
			// rooms
            '/rooms': { name: 'rooms_list', component: RoomsList },
            '/rooms/add': { name: 'room_add', component: RoomForm },
			// ports
            '/ports': { name: 'ports_list', component: PortsList },
            '/ports/add': { name: 'port_add', component: PortForm },
			
            '/temperatures/sensors': { name: 'temperatures_sensors_list', component: TemperatureSensorsList },
            '/temperatures/sensors/add': { name: 'temperatures_sensor_form', component: TemperatureSensorForm },
            '/powers/gauges': { name: 'powers_gauges_list', component: PowerGaugesList },
            '/powers/gauges/add': { name: 'power_gauge_form', component: PowerGaugeForm }
        }
    }
}
