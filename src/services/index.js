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
export const powerGaugeRecordService = feathers_socket.service( '/powers/gauges/records' );
export const waterGaugeRecordService = feathers_socket.service( '/waters/gauges/records' );

// others
export const logService = feathers_socket.service( '/logs' );
