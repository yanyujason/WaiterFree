beforeEach(function () {
    Meteor.call('clearDB');
    Meteor.call('createBossHas1Shop');
    Meteor.call('createBossHas2Shops');
});
