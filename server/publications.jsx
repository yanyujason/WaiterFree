Meteor.publish('votes', () => {
    return Votes.find();
});
