Template.myShops.onCreated(function() {
    SubMgr('my-shops').subscribe('myShops');
});

Template.myShops.helpers({
    shops() {
        return Shops.find();
    }
});
