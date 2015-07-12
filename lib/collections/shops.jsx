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

function isUniqTable(shopId, tableName) {
    return new Rule(() => {
        return !_.contains(Shops.findOne({_id: shopId}).tables.map((t)=> {return t.name}), tableName);
    }, '桌台已存在');
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
        dish.dishId = Meteor.uuid();
        dish.createdAt = new Date();

        Shops.update({_id: shopId, 'menu.dishes.name': {$ne: dish.name}}, {
            $push: {'menu.dishes': dish}
        });
    },

    deleteDish(shopId, dishId) {
        Shops.update(shopId, {$pull: {'menu.dishes': {dishId: dishId}}});
    },

    dishDetailsUpdate(shopId, dishDetails) {
        Validator.verify('dish', dishDetails);
        Validator.verify(isOwner(shopId));

        dishDetails = _.pick(dishDetails, 'name', 'img', 'price', 'desc', 'tags', 'dishId');
        dishDetails.updatedAt = new Date();

        Shops.update({_id: shopId, 'menu.dishes.dishId': dishDetails.dishId}, {$set: {'menu.dishes.$': dishDetails}});
    },

    newTable(shopId, table) {
        Validator.verify(isOwner(shopId));
        Validator.verify(isUniqTable(shopId, table.name));

        table.tableId = Meteor.uuid();

        Shops.update({_id: shopId, 'tables.name': {$ne: table.name}}, {
            $push: {'tables': table}
        })
    },

    deleteTable(shopId, tableId) {
        Validator.verify(isOwner(shopId));

        Shops.update(shopId, {$pull: {'tables': {tableId: tableId}}});
    }
});
