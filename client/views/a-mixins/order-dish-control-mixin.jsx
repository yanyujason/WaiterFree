orderDishControlMixin = new Mixin();

orderDishControlMixin.helpers({
    dishSelected() {
        return !!Orders.findOne({'dishes.dishId': this.dishId});
    },
    selectedCount(zeroText = '') {
        var order = Orders.findOne() || {dishes: []};
        var count = _.filter(order.dishes, (d) => {
            return d.dishId == this.dishId;
        }).length;
        return count || zeroText;
    }
});

orderDishControlMixin.events({
    'click .select-dish': function() {
        var orderId = Orders.findOne()._id,
            dish = _.find(Shops.findOne().menu.dishes, (d) => {return d.dishId == this.dishId;});
        Meteor.call('selectDish', orderId, dish);
    },
    'click .remove-dish': function() {
        var orderId = Orders.findOne()._id,
            dish = _.find(Shops.findOne().menu.dishes, (d) => {return d.dishId == this.dishId;});
        Meteor.call('removeDish', orderId, dish);
    }
});
