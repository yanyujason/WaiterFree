Template.newOrder.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);

    Sub.onReady(() => {
        var order = Orders.findOne();
        if(!order) {
            Meteor.call('newOrder', userUniqId(), shopId, tableId)
        }
    });
});
