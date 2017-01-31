import { Template } from 'meteor/templating';
import { Podcasts } from '/imports/api/podcasts.js';
import './uploadForm.html';
import './uploadForm.css';

Template.uploadForm.onCreated( function() {
  this.currentUpload = new ReactiveVar(false);
  this.uploadLabel = new ReactiveVar("Choose a file");
});


Template.uploadForm.helpers({
  currentUpload: function() {
    return Template.instance().currentUpload.get();
  },

  uploadLabel: function() {
    return Template.instance().uploadLabel.get();
  }
});


Template.uploadForm.events({
  'change #fileInput': function(e, template) {
    if( e.currentTarget.files ) {
      if( e.currentTarget.files.length > 1 ) {
        Template.instance().uploadLabel.set(e.currentTarget.files.length + ' files selected');
      } else {
        Template.instance().uploadLabel.set(e.currentTarget.value);
      }

      let description = Template.instance().$('#fileDescription')
      if( description.val() ) {
        if( e.currentTarget.files[0] ) {
          var upload = Podcasts.insert({
            file: e.currentTarget.files[0],
            streams: 'dynamic',
            chunkSize: 'dynamic',
            meta: {
              description: description.val()
            }
          }, false);

          upload.on('start', function () {
            template.currentUpload.set(this);
          });

          upload.on('end', function (error, fileObj) {
            if (error) {
              alert('Error during upload: ' + error);
            } else {
              alert('File "' + fileObj.name + '" successfully uploaded');
            }
            template.currentUpload.set(false);
          });

          upload.start();
        }
      } else {
        alert("Please supply a description");
        description.focus();
      }
    }
  }
});
