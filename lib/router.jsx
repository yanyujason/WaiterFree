Router.plugin('loading', {loadingTemplate: 'loading'});

Router.route('/my-shops', function() {
    if(Shops.find().count() === 1) {
        Router.go('myShop', {shopId : Shops.findOne()._id});
    } else {
        this.layout('layout');
        this.render('myShops', {
            data: {shops: Shops.find()}
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
        data: Shops.findOne({_id: this.params.shopId})
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
        data: Shops.findOne({_id: this.params.shopId})
    };
    this.layout('myShopLayout', dataContext);
    this.render('updateShopDetails', dataContext);
}, {
    name: 'updateShopDetails',
    waitOn() {
        return Meteor.subscribe('myShop', this.params.shopId);
    }
});

Router.route('/my-shops/:shopId/dishes/add', function() {
    var dataContext = {
        data: Shops.findOne({_id: this.params.shopId})
    };
    this.layout('myShopLayout', dataContext);
    this.render('newDish', dataContext);
}, {
    name: 'newDish',
    waitOn() {
        return [
            Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('qiniuConfig'),
            IRLibLoader.load("/javascripts/plupload.full.min.js"),
            IRLibLoader.load("/javascripts/qiniu-sdk.js")
        ];
    }
});

Router.route('/my-shops/:shopId/dishes/:dishId', function () {
    var dataContext = {
        data: {
            shopId: this.params.shopId,
            dish: _.find(Shops.findOne({_id: this.params.shopId, 'menu.dishes.dishId': this.params.dishId}).menu.dishes, (d) => {return d.dishId == this.params.dishId;})}
    };
    this.layout('myShopLayout', Shops.findOne({_id: this.params.shopId}));
    this.render('updateDishDetails', dataContext);
}, {
    name: 'updateDishDetails',
    waitOn() {
        return [Meteor.subscribe('myShop', this.params.shopId),
            Meteor.subscribe('qiniuConfig'),
            IRLibLoader.load("/javascripts/plupload.full.min.js"),
            IRLibLoader.load("/javascripts/qiniu-sdk.js")
        ]
    }
});

Router.route('/my-shops/:shopId/clerks', function() {
    this.layout('myShopLayout', {data: Shops.findOne({_id: this.params.shopId})});
    this.render('clerkList', {data: {clerks: Meteor.users.find({'profile.shop': this.params.shopId, 'profile.type': 'clerk'})}});
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
    this.layout('myShopLayout', {data: Shops.findOne({_id: shopId})});
    this.render('clerkForm', {data: {shopId: shopId, type: 'new'}});
}, {
    name: 'newClerk',
    waitOn() {
        return Meteor.subscribe('myShop', this.params.shopId)
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
