import { Template } from 'meteor/templating';
import { Podcasts } from '/imports/api/podcasts.js';
import './uploadForm.html';
import './uploadForm.css';

Template.uploadForm.onCreated( function() {
  this.currentUpload = new ReactiveVar(false);
  this.uploadLabel = new ReactiveVar("Enter a description");
  this.fileInputDisabled = new ReactiveVar("disabled");

  this.disableFileChooser = function() {
    this.fileInputDisabled.set("disabled");
    this.uploadLabel.set("Enter a description");
  }.bind(this);

  this.readyFileChooser = function() {
    this.fileInputDisabled.set(false);
    this.uploadLabel.set("Choose a file");
  }.bind(this);

  this.fileDescription = function() {
    return this.$('#fileDescription').val();
  }.bind(this);

});


Template.uploadForm.helpers({
  currentUpload: function() {
    return Template.instance().currentUpload.get();
  },

  fileInputDisabled: function() {
    return Template.instance().fileInputDisabled.get();
  },

  uploadLabel: function() {
    return Template.instance().uploadLabel.get();
  },
});


Template.uploadForm.events({
  'change #fileDescription': function(e, template) {
    if( e.currentTarget.value ) {
      template.readyFileChooser();
    } else {
      template.disableFileChooser();
    }
  },

  'change #fileInput': function(e, template) {
    if( e.currentTarget.files ) {
      if( e.currentTarget.files.length > 1 ) {
        template.uploadLabel.set(e.currentTarget.files[0]);
      } else {
        template.uploadLabel.set(e.currentTarget.value);
      }

      if( template.fileDescription() ) {
        if( e.currentTarget.files[0] ) {
          var upload = Podcasts.insert({
            file: e.currentTarget.files[0],
            streams: 'dynamic',
            chunkSize: 'dynamic',
            meta: {
              description: template.fileDescription()
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
            template.disableFileChooser();
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
