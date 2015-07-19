Template.newOrder.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);

    Sub.onReady(() => {
        var order = Orders.findOne({shop: shopId, table: tableId, status: 'open'});
        if(!order) {
            Meteor.call('newOrder', userUniqId(), shopId, tableId, (e, id) => {
                Session.set('currentOrder', id);
            });
        } else {
            Session.set('currentOrder', order._id);
        }
    });
});
