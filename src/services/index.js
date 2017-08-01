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
export const serialService = feathers_socket.service( '/serial' );

// rooms
export const roomService = feathers_socket.service( '/rooms' );

// transmitters
export const transmitterService = feathers_socket.service( '/transmitters' );
export const transmitterTemperatureRecordService = feathers_socket.service( '/transmitters/temperatures/records' );
export const transmitterTemperatureAvgService = feathers_socket.service( '/transmitters/temperatures/averages' );
export const transmitterHumidityRecordService = feathers_socket.service( '/transmitters/humidities/records' );
export const transmitterHumdidityAvgService = feathers_socket.service( '/transmitters/humidities/averages' );
export const transmitterPowerRecordService = feathers_socket.service( '/transmitters/powers/records' );
export const transmitterWaterRecordService = feathers_socket.service( '/transmitters/waters/records' );

// others
export const logService = feathers_socket.service( '/logs' );

// ========================================================
// SETUP
// ========================================================
export const transmitterSetupService = feathers_socket.service( '/setup/transmitters' );

// ========================================================
// VIEWS
// ========================================================
// transmitters
export const transmitterTemperatureAvgDetailedView = feathers_socket.service( '/views/transmitters/temperatures/avg/detailed' );
export const transmitterHumidityAvgDetailedView = feathers_socket.service( '/views/transmitters/humidities/avg/detailed' );

// records
export const lastRecordPerTransmitterView = feathers_socket.service( '/views/records/last/per/transmitters' );