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

// hardwares
export const hardwareService = feathers_socket.service( '/hardwares' );
export const hardwareTemperatureRecordService = feathers_socket.service( '/hardwares/temperatures/records' );
export const hardwareTemperatureAvgService = feathers_socket.service( '/hardwares/temperatures/averages' );
export const hardwareHumidityRecordService = feathers_socket.service( '/hardwares/humidities/records' );
export const hardwareHumdidityAvgService = feathers_socket.service( '/hardwares/humidities/averages' );
export const hardwarePowerRecordService = feathers_socket.service( '/hardwares/powers/records' );
export const hardwareWaterRecordService = feathers_socket.service( '/hardwares/waters/records' );

// others
export const logService = feathers_socket.service( '/logs' );

// ========================================================
// SETUP
// ========================================================
export const hardwareSetupService = feathers_socket.service( '/setup/hardwares' );

// ========================================================
// VIEWS
// ========================================================
// hardwares
export const hardwareTemperatureAvgDetailedView = feathers_socket.service( '/views/hardwares/temperatures/avg/detailed' );
export const hardwareHumidityAvgDetailedView = feathers_socket.service( '/views/hardwares/humidities/avg/detailed' );

// records
export const lastRecordPerHardwareView = feathers_socket.service( '/views/records/last/per/hardwares' );
export const recordTemperatureAvgLast24HoursView = feathers_socket.service( '/views/records/temperatures/avg/last/24/hours' );
export const recordHumidityAvgLast24HoursView = feathers_socket.service( '/views/records/humidities/avg/last/24/hours' );
