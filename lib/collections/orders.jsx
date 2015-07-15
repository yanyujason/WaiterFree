Orders = new Meteor.Collection('orders');

Meteor.methods({
    newOrder(userUniqId, shopId, tableId) {
        var order = {
            user: Meteor.userId() || userUniqId,
            shop: shopId,
            table: tableId,
            price: 0,
            dishes: [],
            createdAt: new Date(),
            status: 'open'
        };
        Orders.insert(order);
    }
});
