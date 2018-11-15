'use strict';

// Styles
require('./styles/_homepage.scss');

require('@babel/polyfill');
// Components
require('./../../ui-components/header');
require('./../../ui-components/footer');
require('./../../ui-components/request-invite');

require('marko/components').init();
