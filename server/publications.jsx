Meteor.publish('myShops', function () {
    return Shops.find({boss: this.userId});
});

Meteor.publish('myShop', function (shopId) {
    return Shops.find({_id: shopId, boss: this.userId});
});

Meteor.publish('qiniuConfig', function () {
    return QiniuConfig.find({name: 'qiniuConfig'});
});

Meteor.publish('myClerks', function (shopId) {
    return Meteor.users.find({'profile.shop': shopId, 'profile.boss': this.userId, 'profile.type': 'clerk'},
        {fields: {_id: 1, 'emails.address': 1, profile: 1, createdAt: 1}});
});

Meteor.publish('shop', function(shopId) {
    return Shops.find({_id: shopId, boss: this.userId}, {fields: {clerks: 0, boss: 0}});
});

Meteor.publish('activeOrders', function(userUniqId, shopId) {
    return Orders.find({user: this.userId || userUniqId, shop: shopId, status: {$ne: 'close'}});
});

Meteor.publish('latestActiveOrder', function(userUniqId, shopId, tableId) {
    return Orders.find({user: this.userId || userUniqId, shop: shopId, table: tableId, status: {$ne: 'close'}}, {sort: {createdAt: -1}, limit: 1});
});
