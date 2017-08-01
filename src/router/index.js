'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
// components
import App from '../components/App.vue';
// routes
// import dashboardRoutes from './routes/dashboard.routes';
import dashboardRoutes from './routes/dashboard.routes';
import historyRoutes from './routes/history.routes';
import settingsRoutes from './routes/settings.routes';
import setupRoutes from './routes/setup.routes';

Vue.use( VueRouter );

export const router = new VueRouter( {
    linkActiveClass: 'active'
} );

// setting up all routes using the main app component
const routes = Object.assign( {}, dashboardRoutes, dashboardRoutes, historyRoutes, settingsRoutes, setupRoutes );
router.map( {

    '/': {
        name: 'app',
        component: App,
        subRoutes: routes
    }

} );

// setting up the setup component
router.map( setupRoutes );

const Base = Vue.extend();
router.start( Base, '#base' );
