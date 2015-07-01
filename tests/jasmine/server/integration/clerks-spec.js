describe('clerks collection methods', function () {
    describe('newClerk', function () {
        var myShopId;
        beforeEach(function() {
            myShopId = Shops.insert({clerks: []});
            spyOn(Meteor, 'user').and.returnValue({_id: 'bossId', profile: {shops: [myShopId]}});
            spyOn(Meteor, 'userId').and.returnValue('bossId');
        });

        it('get error when profile invalid', function (done) {
            var profile = {
                name: '',
                email: 'ABCDE@ABC',
                password: '12345678',
                passwordConfirm: ['12345678', 'ABCDEFGH']
            };
            Meteor.call('newClerk', myShopId, profile, function(err) {
                expect(err.error).toBe('validation-scenario-clerkProfile');
                expect(err.details[0].field).toBe('name');
                expect(err.details[1].field).toBe('email');
                expect(err.details[2].field).toBe('password');
                expect(err.details[3].field).toBe('passwordConfirm');
                done();
            });
        });

        it('get error when user is not owner', function (done) {
            var profile = {
                name: 'Y.MM',
                email: 'yangmm@waiterfree.com',
                password: 'a1b2c3d4',
                passwordConfirm: ['a1b2c3d4', 'a1b2c3d4']
            };

            var notMyShopId = 'notMyShopId';
            Meteor.call('newClerk', notMyShopId, profile, function(err) {
                expect(err.error).toBe('validation-rule');
                done();
            });
        });

        it('create new clerk for the shop', function (done) {
            var profile = {
                name: 'Y.MM',
                email: 'yangmm@waiterfree.com',
                password: 'a1b2c3d4',
                passwordConfirm: ['a1b2c3d4', 'a1b2c3d4']
            };
            Meteor.call('newClerk', myShopId, profile, function() {
                var clerk = Meteor.users.findOne({'emails.address': 'yangmm@waiterfree.com'});
                expect(clerk).toBeDefined();
                expect(Shops.findOne(myShopId).clerks).toEqual([clerk._id]);
                done();
            });
        });
    });
});
