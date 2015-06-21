Shops = new Meteor.Collection('shops');

Meteor.methods({
    shopDetailsUpdate(shopId, details) {
        Validator.verifyOwner(() => { return _.contains(Meteor.user().profile.shops, shopId); });
        Validator.verify('shopDetails', details);

        details = _.pick(details, 'name', 'desc', 'address', 'tel', 'tags');
        details.updatedAt = new Date();

        Shops.update(shopId, {$set: details});
    }
});
