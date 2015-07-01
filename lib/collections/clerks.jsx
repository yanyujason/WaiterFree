function isOwner (shopId) {
    return new Rule(() => {
        return _.contains(Meteor.user().profile.shops, shopId);
    }, '权限错误');
}
function isShopClerk (shopId, clerkId) {
    return new Rule(() => {
        return _.contains(Shops.findOne(shopId).clerks, clerkId);
    }, '权限错误');
}

Meteor.methods({
    newClerk(shopId, _, clerkProfile) {
        Validator.verify('clerkProfile', clerkProfile);
        Validator.verify(isOwner(shopId));
        var profile = {
            name: clerkProfile.name,
            email: clerkProfile.email,
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
    },

    updateClerk(shopId, clerkId, clerkProfile) {
        Validator.verify('clerkProfile', clerkProfile);
        Validator.verify(isOwner(shopId));
        Validator.verify(isShopClerk(shopId, clerkId));

        if(Meteor.isServer) {
            Accounts.setPassword(clerkId, clerkProfile.password);
        }

        Meteor.users.update(clerkId, {$set: {
            'profile.name': clerkProfile.name,
            'emails': [{address: clerkProfile.email}]
        }});
    }
});
