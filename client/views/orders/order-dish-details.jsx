Template.orderDishDetails.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
    Sub.subscribe('latestActiveOrder', userUniqId(), this.data.shopId, this.data.tableId);
    Sub.subscribe('qiniuConfig');
});

Template.orderDishDetails.helpers({
    dish() {
        var shop = Shops.findOne(this.shopId);
        if(shop) {
            return _.find(shop.menu.dishes, (d) => {return d.dishId == this.dishId;});
        }
    }
});

orderDishControlMixin.mixTo(Template.orderDishDetails);
