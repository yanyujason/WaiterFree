describe('Server integration test sample', function () {
    it('should work', function () {
        expect(Meteor.users.find().count()).toBe(2);
    });
});
