import { FilesCollection } from 'meteor/ostrio:files';
//import { SimpleSchema } from 'simpl-schema';

/*
 *  TODO Add schema
 *    https://github.com/VeliovGroup/Meteor-Files/wiki/Schema
 */
var schema = _.extend(FilesCollection.defaultSchema, { });
export const Podcasts = new FilesCollection({
  collectionName: 'Podcasts',
  storagePath: '/home/brundage/work/mediacaster/public'
//  schema: new SimpleSchema(schema)
});
