Meteor.subscribe('votes');

Template.votes.helpers({
  vote() {
    console.log(Votes.findOne());
    return Votes.find().count();
  }
});

Template.votes.events({
  'click button': () => {
    Votes.insert({});
  }
});
