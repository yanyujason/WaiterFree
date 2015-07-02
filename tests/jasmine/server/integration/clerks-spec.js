describe('clerks collection methods', function () {
    var myShopId;
    beforeEach(function() {
        myShopId = Shops.insert({clerks: []});
        spyOn(Meteor, 'user').and.returnValue({_id: 'bossId', profile: {shops: [myShopId]}});
        spyOn(Meteor, 'userId').and.returnValue('bossId');
    });

    describe('newClerk', function () {
        it('get error when profile invalid', function (done) {
            var profile = {
                name: '',
                number: '...',
                password: '12345678',
                passwordConfirm: ['12345678', 'ABCDEFGH']
            };
            Meteor.call('newClerk', myShopId, null, profile, function(err) {
                expect(err.error).toBe('validation-scenario-clerkProfile');
                expect(err.details[0].field).toBe('name');
                expect(err.details[1].field).toBe('number');
                expect(err.details[2].field).toBe('password');
                expect(err.details[3].field).toBe('passwordConfirm');
                done();
            });
        });

        it('get error when user is not owner', function (done) {
            var profile = {
                name: 'Y.MM',
                number: '001',
                password: 'a1b2c3d4',
                passwordConfirm: ['a1b2c3d4', 'a1b2c3d4']
            };

            var notMyShopId = 'notMyShopId';
            Meteor.call('newClerk', notMyShopId, null, profile, function(err) {
                expect(err.error).toBe('validation-rule');
                done();
            });
        });

        it('create new clerk for the shop', function (done) {
            var profile = {
                name: 'Y.MM',
                number: '001',
                password: 'a1b2c3d4',
                passwordConfirm: ['a1b2c3d4', 'a1b2c3d4']
            };
            Meteor.call('newClerk', myShopId, null, profile, function() {
                var clerk = Meteor.users.findOne({'emails.address': '001@' + myShopId + '.com'});

                expect(clerk).toBeDefined();
                expect(clerk.profile.name).toBe('Y.MM');
                expect(clerk.profile.number).toBe('001');
                expect(clerk.profile.shop).toBe(myShopId);
                expect(clerk.profile.type).toBe('clerk');
                expect(clerk.profile.boss).toBe('bossId');

                expect(Shops.findOne(myShopId).clerks).toEqual([clerk._id]);
                done();
            });
        });
    });

    describe('updateClerk', function () {
        var clerkId;
        beforeEach(function() {
            Meteor.call('newClerk', myShopId, null, {
                name: 'Y.MM',
                number: '001',
                password: 'a1b2c3d4',
                passwordConfirm: ['a1b2c3d4', 'a1b2c3d4']
            });
            clerkId = Meteor.users.findOne({'emails.address': '001@' + myShopId + '.com'})._id;
        });

        it('get error when profile invalid', function (done) {
            var profile = {
                name: '',
                number: '...',
                password: '12345678',
                passwordConfirm: ['12345678', 'ABCDEFGH']
            };
            Meteor.call('updateClerk', myShopId, clerkId, profile, function(err) {
                expect(err.error).toBe('validation-scenario-clerkProfile');
                expect(err.details[0].field).toBe('name');
                expect(err.details[1].field).toBe('number');
                expect(err.details[2].field).toBe('password');
                expect(err.details[3].field).toBe('passwordConfirm');
                done();
            });
        });

        it('get error when user is not owner', function (done) {
            var profile = {
                name: 'Y.MMM',
                number: '002',
                password: 'z0x9c8v7',
                passwordConfirm: ['z0x9c8v7', 'z0x9c8v7']
            };

            var notMyShopId = 'notMyShopId';
            Meteor.call('updateClerk', notMyShopId, clerkId, profile, function(err) {
                expect(err.error).toBe('validation-rule');
                done();
            });
        });

        it('get error when clerk is not in shop', function (done) {
            var profile = {
                name: 'Y.MMM',
                number: '002',
                password: 'z0x9c8v7',
                passwordConfirm: ['z0x9c8v7', 'z0x9c8v7']
            };

            var clerkNotInShopId = 'notInShopId';
            Meteor.call('updateClerk', clerkNotInShopId, clerkId, profile, function(err) {
                expect(err.error).toBe('validation-rule');
                done();
            });
        });

        it('update clerk for the shop', function (done) {
            spyOn(Accounts, 'setPassword');
            var profile = {
                name: 'Y.MMM',
                number: '002',
                password: 'z0x9c8v7',
                passwordConfirm: ['z0x9c8v7', 'z0x9c8v7']
            };
            Meteor.call('updateClerk', myShopId, clerkId, profile, function() {
                var clerk = Meteor.users.findOne({'emails.address': '002@' + myShopId + '.com'});
                expect(clerk).toBeDefined();
                expect(clerk.profile.name).toBe('Y.MMM');
                expect(clerk.profile.number).toBe('002');
                expect(clerk.profile.shop).toBe(myShopId);
                expect(clerk.profile.type).toBe('clerk');
                expect(clerk.profile.boss).toBe('bossId');
                expect(Accounts.setPassword).toHaveBeenCalledWith(clerkId, 'z0x9c8v7');
                expect(Shops.findOne(myShopId).clerks).toEqual([clerk._id]);
                done();
            });
        });
    });
});
