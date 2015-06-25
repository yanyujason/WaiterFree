Shops = new Meteor.Collection('shops');

Meteor.methods({
    shopDetailsUpdate(shopId, details) {
        Validator.verifyOwner(() => {
            return _.contains(Meteor.user().profile.shops, shopId);
        });
        Validator.verify('shopDetails', details);

        details = _.pick(details, 'name', 'desc', 'address', 'tel', 'tags');
        details.updatedAt = new Date();

        Shops.update(shopId, {$set: details});
    },

    newDish(shopId, dish) {
        Validator.verifyOwner(() => {
            return _.contains(Meteor.user().profile.shops, shopId)
        });
        Validator.verify('dish', dish);

        dish = _.pick(dish, 'name', 'img', 'price', 'desc', 'tags');
        dish.tags = _.uniq(dish.tags);
        dish.createdAt = new Date();

        Shops.update(shopId, {
            $push: {'menu.dishes': dish},
            $addToSet: {'menu.tagPriority': {$each: dish.tags}}
        });
    }
});
