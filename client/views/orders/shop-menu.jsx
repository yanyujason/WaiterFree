Template.shopMenu.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
    Sub.subscribe('qiniuConfig');
});

Template.shopMenu.helpers({
    menu() {
        return (Shops.findOne() || {}).menu;
    }
});

Template.shopMenu.helpers({
    dishSelected() {
        return !!Orders.findOne({'dishes.dishId': this.dishId});
    },
    selectedCount() {
        var order = Orders.findOne() || {dishes: []};
        var count = _.filter(order.dishes, (d) => {
            return d.dishId == this.dishId;
        }).length;
        return count || '';
    }
});

Template.shopMenu.events({
    'click .category': function (e) {
        var tag = $(e.target).data('category');
        Session.set('dishCategory', tag);
    },
    'click .select-dish': function() {
        var orderId = Session.get('currentOrder');
        Meteor.call('selectDish', orderId, this);
    },
    'click .remove-dish': function() {
        var orderId = Session.get('currentOrder');
        Meteor.call('removeDish', orderId, this);
    }
});

dishCategoryMixin.mixTo(Template.shopMenu);
