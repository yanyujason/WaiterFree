Shops = new Meteor.Collection('shops');

Shops.allow({
    update(userId, shop) {
        return shop && shop.boss === userId;
    }
});

Shops.deny({
    update(userId, shop, detailFields) {
        return _.intersection(detailFields, ['status', 'boss', 'createdAt']).length;
    }
});

Meteor.methods({
    shopDetailsUpdate(shopId, details) {
        Validator.verifyOwner(() => { return _.contains(Meteor.user().profile.shops, shopId); });
        Validator.verify('shopDetails', details);

        details = _.pick(details, 'name', 'desc', 'address', 'tel', 'tags');
        details.updatedAt = new Date();

        Shops.update(shopId, {$set: details});
    }
});
