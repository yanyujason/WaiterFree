Meteor.publish('myShops', (bossId) => {
    return Shops.find({boss: bossId});
});
