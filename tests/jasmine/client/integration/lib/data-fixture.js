beforeEach(function (done) {
    Meteor.call('clearDB', done);
});

beforeEach(function (done) {
    Meteor.call('createBossHas1Shop', done);
});

beforeEach(function (done) {
    Meteor.call('createBossHas2Shops', done);
});
