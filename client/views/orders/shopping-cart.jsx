Template.shoppingCart.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);
    Sub.subscribe('qiniuConfig');
});

Template.shoppingCart.helpers({
    order() {
        return Orders.findOne({shop: this.shopId, table: this.tableId, status: 'open'}, {sort: {createdAt: -1}});
    }
});

Template.shoppingCart.events({
    'click .remove-dish': function() {
        var orderId = Session.get('currentOrder');
        Meteor.call('removeDish', orderId, this);
    }
});
