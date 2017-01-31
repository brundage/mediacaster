import { FlowRouter  } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layout/app-body.js';
import '/imports/ui/pages/podcasts.js';

FlowRouter.route( '/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'podcasts' } );
  }
});
