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
        return Orders.insert(order);
    },

    selectDish(order, dish) {
        dish.serialId = Meteor.uuid();
        Orders.update(order, {$push: {dishes: dish}, $inc: {price: dish.price}});
    },

    removeDish(order, dish) {
        if(!dish.serialId) {
            dish = _.find(Orders.findOne(order).dishes, (d) => {
                return d.dishId == dish.dishId;
            });
        }
        Orders.update(order, {$pull: {dishes: {serialId: dish.serialId}}, $inc: {price: -dish.price}});
    }
});
