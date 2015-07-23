Template.shoppingCart.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);
    Sub.subscribe('qiniuConfig');
});

Template.shoppingCart.helpers({
    order() {
        return Orders.findOne() || {price: 0, dishes: []};
    }
});

orderDishControlMixin.mixTo(Template.shoppingCart);
