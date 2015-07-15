Template.shopMenu.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
    Sub.subscribe('qiniuConfig');
});

Template.shopMenu.helpers({
    menu() {
        return (Shops.findOne(this.shopId) || {}).menu;
    }
});
