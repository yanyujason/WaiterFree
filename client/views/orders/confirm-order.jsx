Template.confirmOrder.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);
});


Template.confirmOrder.helpers({
    order() {
        return Orders.findOne() || {price: 0, dishes: []};
    }
});

Template.shoppingCart.helpers({
    totalPrice() {
        return this.price * this.count;
    }
});
