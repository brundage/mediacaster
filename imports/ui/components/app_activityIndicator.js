import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './app_activityIndicator.html';
import './app_activityIndicator.less';

Template.App_activityIndicator.helpers({
  activity: function() { return Session.get('activity') }
});
