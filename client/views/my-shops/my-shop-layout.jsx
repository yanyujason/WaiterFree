Template.myShopLayout.onCreated(function() {
    Sub.subscribe('myShop', this.data.shopId);
});

Template.myShopLayout.helpers({
    shop() {
        return Shops.findOne(this.shopId);
    }
});
