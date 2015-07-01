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
