var sub = new SubsManager();

Router.configure({loadingTemplate: 'loading'});

Router.route('/sign-in', function() {
    if(!Meteor.userId()) {
        this.render('bossSignIn');
    } else {
        Router.go('myShops');
    }
}, {
    name: 'bossSignIn'
});

Router.route('/my-shops', function() {
    if(Shops.find().count() === 1) {
        Router.go('myShop', {shopId : Shops.findOne()._id});
    } else {
        this.layout('layout');
        this.render('myShops', {
            data: {shops: Shops.find({})}
        });
    }
}, {
    name: 'myShops',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return sub.subscribe('myShops');
    }
});

Router.route('/my-shops/:shopId', function() {
    var shopId = this.params.shopId;
    var dataContext = {
        data: {
            shop: Shops.findOne(shopId),
            clerks: Meteor.users.find({'profile.shop': shopId, 'profile.type': 'clerk'})
        }
    };
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('myShop', dataContext);
}, {
    name: 'myShop',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return [
            sub.subscribe('myShop', this.params.shopId),
            sub.subscribe('myClerks', this.params.shopId),
            sub.subscribe('qiniuConfig')
        ];
    }
});

Router.route('/my-shops/:shopId/details', function() {
    var dataContext = {
        data: Shops.findOne(this.params.shopId)
    };
    this.layout('myShopLayout', dataContext);
    this.render('updateShopDetails', dataContext);
}, {
    name: 'updateShopDetails',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return sub.subscribe('myShop', this.params.shopId);
    }
});

Router.route('/my-shops/:shopId/clerks/add', function() {
    var shopId = this.params.shopId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('clerkForm', {data: {shopId: shopId, clerk: {}}});
}, {
    name: 'newClerk',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return sub.subscribe('myShop', this.params.shopId)
    }
});

Router.route('/my-shops/:shopId/clerks/:clerkId', function() {
    var shopId = this.params.shopId;
    var clerkId = this.params.clerkId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('clerkForm', {data: {shopId: shopId, clerk: Meteor.users.findOne(clerkId)}});
}, {
    name: 'updateClerk',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return [
            sub.subscribe('myShop', this.params.shopId),
            sub.subscribe('myClerks', this.params.shopId)
        ]
    }
});

Router.route('/my-shops/:shopId/dishes/add', function() {
    var shopId = this.params.shopId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('dishForm', {data: {shopId: shopId, dish: {}}});
}, {
    name: 'newDish',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return [sub.subscribe('myShop', this.params.shopId),
            sub.subscribe('qiniuConfig'),
            IRLibLoader.load("/javascripts/plupload.full.min.js"),
            IRLibLoader.load("/javascripts/qiniu-sdk.js")];
    }
});

Router.route('/my-shops/:shopId/dishes/:dishId', function () {
    var dataContext = {
        data: {
            shopId: this.params.shopId,
            dish: _.find(Shops.findOne(this.params.shopId).menu.dishes, (d) => {return d.dishId == this.params.dishId;})
        }
    };
    this.layout('myShopLayout', {data: Shops.findOne(this.params.shopId)});
    this.render('dishForm', dataContext);
}, {
    name: 'updateDishDetails',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return [sub.subscribe('myShop', this.params.shopId),
            sub.subscribe('qiniuConfig'),
            IRLibLoader.load("/javascripts/plupload.full.min.js"),
            IRLibLoader.load("/javascripts/qiniu-sdk.js")];
    }
});

function bossLoginFilter() {
    if(Meteor.userId()) {
        this.next();
    } else {
        this.redirect('bossSignIn');
    }
}

function clearErrorFilter() {
    Errors.remove({});
    this.next();
}
Router.onBeforeAction(clearErrorFilter);
