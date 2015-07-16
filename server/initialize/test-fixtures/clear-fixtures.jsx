if (process.env.IS_MIRROR) {
    Meteor.methods({
        clearDB() {
            Meteor.users.remove({});
            Shops.remove({});
            QiniuConfig.remove({});
            Orders.remove({});
        }
    });
}
