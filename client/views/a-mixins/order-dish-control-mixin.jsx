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
        var orderId = Session.get('currentOrder');
        Meteor.call('selectDish', orderId, this);
    },
    'click .remove-dish': function() {
        var orderId = Session.get('currentOrder');
        Meteor.call('removeDish', orderId, this);
    }
});
