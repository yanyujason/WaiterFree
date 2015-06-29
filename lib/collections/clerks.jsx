function isOwner (shopId) {
    return new Rule(() => {
        return _.contains(Meteor.user().profile.shops, shopId);
    }, '权限错误');
}

Meteor.methods({
    newClerk(shopId, clerkProfile) {
        Validator.verify('clerkProfile', clerkProfile);
        Validator.verify(isOwner(shopId));
        var profile = {
            name: clerkProfile.name,
            type: 'clerk',
            shop: shopId,
            boss: Meteor.userId()
        };

        var clerkId = Accounts.createUser({
            email: clerkProfile.email,
            password: clerkProfile.password,
            profile: profile
        });

        Shops.update(shopId, {$push: {clerks: clerkId}});
    }
});
