Template.myShopLayout.onCreated(function() {
    SubMgr.clearExcept('my-shop');
    Sub = SubMgr('my-shop');
    Sub.subscribe('myShop', this.data.shopId);
});

Template.myShopLayout.helpers({
    shop() {
        return Shops.findOne(this.shopId);
    }
});
