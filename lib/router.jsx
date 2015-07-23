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
        this.render('myShops');
    }
}, {
    name: 'myShops',
    onBeforeAction: bossLoginFilter,
    waitOn() {
        return Meteor.subscribe('myShops');
    }
});

Router.route('/my-shops/:shopId', function() {
    var dataContext = {data: {shopId: this.params.shopId}};
    this.layout('myShopLayout', dataContext);
    this.render('myShop', dataContext);
}, {
    name: 'myShop',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/details', function() {
    var dataContext = {data: {shopId: this.params.shopId}};
    this.layout('myShopLayout', dataContext);
    this.render('updateShopDetails', dataContext);
}, {
    name: 'updateShopDetails',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/clerks/add', function() {
    var dataContext = {data: {shopId: this.params.shopId}};
    this.layout('myShopLayout', dataContext);
    this.render('clerkForm', dataContext);
}, {
    name: 'newClerk',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/clerks/:clerkId', function() {
    var dataContext = {data: {shopId: this.params.shopId, clerkId: this.params.clerkId}};
    this.layout('myShopLayout', dataContext);
    this.render('clerkForm', dataContext);
}, {
    name: 'updateClerk',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/dishes/add', function() {
    var dataContext = {data: {shopId: this.params.shopId}};
    this.layout('myShopLayout', dataContext);
    this.render('dishForm', dataContext);
}, {
    name: 'newDish',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/dishes/:dishId', function () {
    var dataContext = {data: {shopId: this.params.shopId, dishId: this.params.dishId}};
    this.layout('myShopLayout', dataContext);
    this.render('dishForm', dataContext);
}, {
    name: 'updateDishDetails',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/tables', function () {
    var dataContext = {data: {shopId: this.params.shopId}};
    this.layout('myShopLayout', dataContext);
    this.render('myTables', dataContext);
  }, {
    name: 'myTables',
    onBeforeAction: bossLoginFilter
});

Router.route('/my-shops/:shopId/tables/new', function () {
    var dataContext = {data: {shopId: this.params.shopId}};
    this.layout('myShopLayout', dataContext);
    this.render('newTable', dataContext);
}, {
    name: 'newTable',
    onBeforeAction: bossLoginFilter
});

Router.route('/orders/:shopId/:tableId', function() {
    var dataContext = {data: {shopId: this.params.shopId, tableId: this.params.tableId}};
    this.layout('newOrderLayout', dataContext);
    this.render('newOrder', dataContext);
}, {
    name: 'newOrder'
});

Router.route('/orders/:shopId/:tableId/cart', function() {
    var dataContext = {data: {shopId: this.params.shopId, tableId: this.params.tableId}};
    this.layout('newOrderLayout', dataContext);
    this.render('shoppingCart', dataContext);
}, {
    name: 'shoppingCart'
});

Router.route('/orders/:shopId/:tableId/dish/:dishId', function() {
    var dataContext = {data: {shopId: this.params.shopId, tableId: this.params.tableId, dishId: this.params.dishId}};
    this.layout('newOrderLayout', dataContext);
    this.render('orderDishDetails', dataContext);
}, {
    name: 'orderDishDetails'
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
