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

function checkUniq (shopId, clerkNumber) {
    return new Rule(() => {
        return !Meteor.users.find({'profile.shop': shopId, 'profile.number': clerkNumber}).count();
    }, '店员已存在');
}

function clerkEmail(shopId, number) {
    return `${number}@${shopId}.com`;
}

Meteor.methods({
    newClerk(shopId, _, clerkProfile) {
        Validator.verify('clerkProfile', clerkProfile);
        Validator.verify(isOwner(shopId));
        Validator.verify(checkUniq(shopId, clerkProfile.number));
        var profile = {
            name: clerkProfile.name,
            number: clerkProfile.number,
            type: 'clerk',
            shop: shopId,
            boss: Meteor.userId()
        };

        var clerkId = Accounts.createUser({
            email: clerkEmail(shopId, clerkProfile.number),
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
            'profile.number': clerkProfile.number,
            'emails': [{address: clerkEmail(shopId, clerkProfile.number)}]
        }});
    },

    deleteClerk(shopId, clerkId) {
        Validator.verify(isOwner(shopId));
        Validator.verify(isShopClerk(shopId, clerkId));

        Meteor.users.remove(clerkId);
        Shops.update(shopId, {$pull: {clerks: clerkId}});
    }

});
