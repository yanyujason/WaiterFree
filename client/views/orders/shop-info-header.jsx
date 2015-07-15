Template.shopInfoHeader.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
});

Template.shopInfoHeader.helpers({
    shop() {
        return Shops.findOne(this.shopId);
    }
});
