Template.shopMenu.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
    Sub.subscribe('qiniuConfig');
});

Template.shopMenu.helpers({
    menu() {
        return (Shops.findOne(this.shopId) || {}).menu;
    }
});

Template.shopMenu.events({
    'click .select-dish': function() {
        var orderId = Session.get('currentOrder');
        Meteor.call('selectDish', orderId, this);
    }
});
