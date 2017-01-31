import { Template } from 'meteor/templating';
import { Podcasts } from '/imports/api/podcasts.js';
import '/imports/api/podcasts.js';
import '/imports/ui/components/uploadForm.js';
import '/imports/ui/components/podcast.js';
import './podcasts.html';

Template.podcasts.onCreated(function() {
  this.autorun(() => {
    this.subscribe('podcasts');
  });
});

/*
Template.podcasts.helpers({
  podcasts() {
    return Podcasts.find({});
  }
});
*/
