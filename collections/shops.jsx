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
