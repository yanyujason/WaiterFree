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

Template.shoppingCartBar.events ({
    'click .confirm-order': function(e) {
        if(!Orders.findOne().price) {
            e.preventDefault();
            Popups.alert({
                message: `您还未点单哦~`,
                buttonText: '继续点单'
            });
        }
    }
});
