'use strict';

import Vue from 'vue';

// mixins
import mixins from './mixins/global.mixins';
Vue.mixin( mixins );

import './router';

// config
import './config/moment.config';
import './config/semantic.config';
