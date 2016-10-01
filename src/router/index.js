'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
// components
import App from '../components/App.vue';
// routes
import dashboardRoutes from './routes/dashboard.routes';
import settingsRoutes from './routes/settings.routes';

Vue.use( VueRouter );
export const router = new VueRouter( {
    linkActiveClass: 'active'
} );

const routes = Object.assign( {}, dashboardRoutes, settingsRoutes );
router.map( {
    '/': {
        name: 'app',
        component: App,
        subRoutes: routes
    }
} );

const Base = Vue.extend();
router.start( Base, '#app' );