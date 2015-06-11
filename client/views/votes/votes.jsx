Meteor.subscribe('votes');

Template.votes.helpers({
  vote() {
    return Votes.find().count();
  }
});

Template.votes.events({
  'click button': () => {
    Votes.insert({});
  }
});
