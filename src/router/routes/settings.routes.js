'use strict';

import Settings from 'components/Settings/Settings.vue';
import RoomsList from 'components/Settings/Rooms/RoomsList.vue';
import RoomForm from 'components/Settings/Rooms/RoomForm.vue';
import TemperatureSensorsList from 'components/Settings/Sensors/TemperatureSensorsList.vue';
import TemperatureSensorForm from 'components/Settings/Sensors/TemperatureSensorForm.vue';
import PowerGaugesList from 'components/Settings/Gauges/PowerGaugesList.vue';
import PowerGaugeForm from 'components/Settings/Gauges/PowerGaugeForm.vue';

export default {
    '/settings': {
        name: 'settings',
        component: Settings,
        subRoutes: {
            '/rooms': { name: 'rooms_list', component: RoomsList },
            '/rooms/add': { name: 'room_add', component: RoomForm },
            '/temperatures/sensors': { name: 'temperatures_sensors_list', component: TemperatureSensorsList },
            '/temperatures/sensors/add': { name: 'temperatures_sensor_form', component: TemperatureSensorForm },
            '/powers/gauges': { name: 'powers_gauges_list', component: PowerGaugesList },
            '/powers/gauges/add': { name: 'power_gauge_form', component: PowerGaugeForm }
        }
    }
}