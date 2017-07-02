'use strict';

import Setup from 'components/Setup/Setup.vue';
import Menu from 'components/Setup/Menu.vue';

export default {

    '/setup': { 
        component: Setup,
        subRoutes: {

            // menu
            '/': { name: 'setup', component: Menu },

            // rooms
            

        } 
    }

}