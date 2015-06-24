Router.plugin('loading', {loadingTemplate: 'loading'})
Router.route('/my-shops', function() {
    Meteor.subscribe('myShops');
    this.layout('layout');

    if(Shops.find().count() === 1) {
        Router.go('myShop', {shopId : Shops.findOne()._id});
    } else {
        this.render('myShops', {
            data: {shops: Shops.find()}
        });
    }
}, {name: 'myShops'});

Router.route('/my-shops/:shopId', function() {
    var shopId = this.params.shopId;
    this.layout('myShopLayout',{
        data: Shops.findOne({_id: shopId})
    });
    this.render('myShop', {
        data: Shops.findOne({_id: shopId})
    });
}, {
    name: 'myShop',
    waitOn:function() {
        return Meteor.subscribe('myShop', this.params.shopId);
    }
});

Router.route('/my-shops/:shopId/details', function() {
    var shopId = this.params.shopId;
    Meteor.subscribe('myShop', shopId);
    this.layout('myShopLayout', {
        data: Shops.findOne({_id: shopId})
    });
    this.render('updateShopDetails', {
        data: Shops.findOne({_id: shopId})
    });
}, {name: 'updateShopDetails'});

Router.route('/my-shops/:shopId/menu', function() {
    var shopId = this.params.shopId;
    Meteor.subscribe('myShop', shopId);
    this.layout('myShopLayout', {
        data: Shops.findOne({_id: shopId})
    });
    this.render('updateShopMenu', {
        data: Shops.findOne({_id: shopId})
    });
}, {name: 'updateShopMenu'});



function loginFilter() {
    if(Meteor.userId()) {
        this.next();
    } else {
        // TODO
        console.log('TODO Should redirect to 404');
        this.next();
    }
}

function clearErrorFilter() {
    Errors.remove({});
    this.next();
}
Router.onBeforeAction(clearErrorFilter);
Router.onBeforeAction(loginFilter);
