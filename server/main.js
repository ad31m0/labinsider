import { Meteor } from 'meteor/meteor';
import { LabsCollection } from '/imports/api/modules/labs';


Meteor.startup(() => {
  if (LabsCollection.find().count()  <1) {
    Meteor.call("labs.generateSeed", 5);
  }
});
