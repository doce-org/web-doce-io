'use strict';

import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';

// connect to feathersJS server
const socket = io( process.env.HOST_URL, { reconnect: true } );

export const feathers_socket = feathers()
    .configure( socketio( socket ) )
    .configure( hooks() );

// ========================================================
// SERVICES
// ========================================================
// ports
export const portService = feathers_socket.service( '/ports' );
export const portListService = feathers_socket.service( '/ports/list' );
export const connectionService = feathers_socket.service( '/connections' );

// rooms
export const roomService = feathers_socket.service( '/rooms' );

// hardware
export const hardwareService = feathers_socket.service( '/hardwares' );

// sensors
export const temperatureSensorRecordService = feathers_socket.service( '/temperatures/sensors/records' );
export const humiditySensorRecordService = feathers_socket.service( '/humidities/sensors/records' );
export const powerMeterRecordService = feathers_socket.service( '/powers/meters/records' );
export const waterMeterRecordService = feathers_socket.service( '/waters/meters/records' );

// others
export const logService = feathers_socket.service( '/logs' );

// ========================================================
// VIEWS
// ========================================================
// hardware
export const hardwareTemperatureView = feathers_socket.service( '/views/hardwares/temperatures' );
