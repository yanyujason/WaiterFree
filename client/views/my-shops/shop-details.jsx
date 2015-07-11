Template.shopDetails.onCreated(function() {
    Sub.subscribe('myShop', this.data.shopId);
});

Template.shopDetails.helpers({
    shop() {
        return Shops.findOne(this.shopId);
    }
});
