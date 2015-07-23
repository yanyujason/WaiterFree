orderDishControlMixin = new Mixin();

orderDishControlMixin.helpers({
    dishSelected() {
        return !!Orders.findOne({'dishes.dishId': this.dishId});
    },
    selectedCount(zeroText = '') {
        var order = Orders.findOne() || {dishes: []};
        var dish = _.find(order.dishes, (d) => {
            return d.dishId == this.dishId;
        });
        return dish ? dish.count : zeroText;
    }
});

orderDishControlMixin.events({
    'click .select-dish': function() {
        var orderId = Orders.findOne()._id;
        Meteor.call('selectDish', orderId, this.dishId);
    },
    'click .remove-dish': function() {
        var orderId = Orders.findOne()._id;
        Meteor.call('removeDish', orderId, this.dishId);
    }
});
