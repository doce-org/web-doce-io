'use strict';

import Vue from 'vue';

import './router';

// filters
import filters from './filters';
Vue.use( filters );

// transitions
import transitions from './transitions';
Vue.use( transitions );

// mixins
import mixins from './mixins/global.mixins';
Vue.mixin( mixins );

// config
import './config/moment.config';
import './config/semantic.config';
