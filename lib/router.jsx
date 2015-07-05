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
    waitOn() {
        return Meteor.subscribe('myShops');
    }
});

Router.route('/my-shops/:shopId', function() {
    var dataContext = {
        data: Shops.findOne(this.params.shopId)
    };
    this.layout('myShopLayout', dataContext);
    this.render('myShop', dataContext);
}, {
    name: 'myShop',
    waitOn() {
        return [
            Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('qiniuConfig')
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
    waitOn() {
        return Meteor.subscribe('myShop', this.params.shopId);
    }
});

Router.route('/my-shops/:shopId/clerks', function() {
    var shopId = this.params.shopId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('clerkList', {data: {shopId: shopId, clerks: Meteor.users.find({'profile.shop': shopId, 'profile.type': 'clerk'})}});
}, {
    name: 'clerkList',
    waitOn() {
        return [
            Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('myClerks', this.params.shopId)
        ]
    }
});

Router.route('/my-shops/:shopId/clerks/add', function() {
    var shopId = this.params.shopId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('clerkForm', {data: {shopId: shopId, clerk: {}}});
}, {
    name: 'newClerk',
    waitOn() {
        return Meteor.subscribe('myShop', this.params.shopId)
    }
});

Router.route('/my-shops/:shopId/clerks/:clerkId', function() {
    var shopId = this.params.shopId;
    var clerkId = this.params.clerkId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('clerkForm', {data: {shopId: shopId, clerk: Meteor.users.findOne(clerkId)}});
}, {
    name: 'updateClerk',
    waitOn() {
        return [
            Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('myClerks', this.params.shopId)
        ]
    }
});

Router.route('/my-shops/:shopId/dishes/add', function() {
    var shopId = this.params.shopId;
    this.layout('myShopLayout', {data: Shops.findOne(shopId)});
    this.render('dishForm', {data: {shopId: shopId, dish: {}}});
}, {
    name: 'newDish',
    waitOn() {
        return [Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('qiniuConfig'),
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
    waitOn() {
        return [Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('qiniuConfig'),
            IRLibLoader.load("/javascripts/plupload.full.min.js"),
            IRLibLoader.load("/javascripts/qiniu-sdk.js")];
    }
});

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
