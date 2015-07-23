Orders = new Meteor.Collection('orders');

Meteor.methods({
    newOrder(userUniqId, shopId, tableId) {
        var order = {
            user: Meteor.userId() || userUniqId,
            shop: shopId,
            table: tableId,
            price: 0,
            dishes: [],
            dishCount: 0,
            createdAt: new Date(),
            status: 'open'
        };
        return Orders.insert(order);
    },

    selectDish(order, dishId) {
        var shop = Shops.findOne({'menu.dishes.dishId': dishId}) || {menu: {dishes: []}};
        var dish = _.find(shop.menu.dishes, (d) => {return d.dishId == dishId});
        if(dish) {
            if(Orders.find({_id: order, 'dishes.dishId': dish.dishId}).count()) {
                Orders.update({_id: order, 'dishes.dishId': dish.dishId},
                    {$inc: {price: dish.price, dishCount: 1, 'dishes.$.count': 1}});
            } else {
                dish.count = 1;
                Orders.update(order, {$push: {dishes: dish}, $inc: {price: dish.price, dishCount: 1}});
            }
        } else {
            throw new Meteor.Error('菜品不存在');
        }
    },

    removeDish(order, dishId) {
        var orderWithDish = Orders.findOne({_id: order, 'dishes.dishId': dishId});
        var dish = _.find(orderWithDish.dishes, (d) => {return d.dishId == dishId});
        if(dish.count >= 2) {
            Orders.update({_id: order, 'dishes.dishId': dish.dishId},
                {$inc: {price: -dish.price, dishCount: -1, 'dishes.$.count': -1}});
        } else if(dish.count == 1) {
            Orders.update(order, {$pull: {dishes: {dishId: dish.dishId}}, $inc: {price: -dish.price, dishCount: -1}});
        }
    }
});
