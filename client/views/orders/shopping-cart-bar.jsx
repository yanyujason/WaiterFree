Template.shoppingCartBar.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);
});

Template.shoppingCartBar.helpers({
    order() {
        return Orders.findOne() || {price: 0, dishCount: 0};
    }
});
