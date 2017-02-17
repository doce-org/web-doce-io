'use strict';

import Vue from 'vue';

import './router';

// mixins
import mixins from './mixins/global.mixins';
Vue.mixin( mixins );

// config
import './config/moment.config';
import './config/semantic.config';
