Meteor.publish('myShops', function() {
    return Shops.find({boss: this.userId});
});

Meteor.publish('myShop', function(shopId) {
    return Shops.find({_id: shopId, boss: this.userId});
});
