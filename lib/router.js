Router.route('/my-shops/:bossId', function() {
    Meteor.subscribe('myShops', this.params.bossId);
    this.layout('layout');
    this.render('myShop', {
        data: {
            shop: Shops.findOne()
        }
    });
});
