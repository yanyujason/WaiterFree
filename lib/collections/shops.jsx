Shops = new Meteor.Collection('shops');

function isOwner (shopId) {
    return new Rule(() => {
        return _.contains(Meteor.user().profile.shops, shopId);
    }, '权限错误');
}

function isUniqDish(shopId, dishName) {
    return new Rule(() => {
        return !Shops.find({_id: shopId, 'menu.dishes.name': dishName}).count();
    }, '菜品已存在');
}

Meteor.methods({
    shopDetailsUpdate(shopId, details) {
        Validator.verify('shopDetails', details);
        Validator.verify(isOwner(shopId));

        details = _.pick(details, 'name', 'desc', 'address', 'tel', 'tags');
        details.updatedAt = new Date();

        Shops.update(shopId, {$set: details});
    },

    newDish(shopId, dish) {
        Validator.verify('dish', dish);
        Validator.verify(isOwner(shopId));
        Validator.verify(isUniqDish(shopId, dish.name));

        dish = _.pick(dish, 'name', 'img', 'price', 'desc', 'tags');
        dish.tags = _.uniq(dish.tags);
        dish.createdAt = new Date();

        Shops.update({_id: shopId, 'menu.dishes.name': {$ne: dish.name}}, {
            $push: {'menu.dishes': dish},
            $addToSet: {'menu.tagPriority': {$each: dish.tags}}
        });
    }
});
