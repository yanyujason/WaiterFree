Router.route('/my-shops', function() {
    Meteor.subscribe('myShops');
    this.layout('layout');

    if(Shops.find().count() === 1) {
        Router.go(`/my-shops/${Shops.findOne()._id}`);
    } else {
        this.render('myShops', {
            data: {
                shops: Shops.find()
            }
        });
    }
}, {name: 'myShops'});

Router.route('/my-shops/:shopId', function() {
    Meteor.subscribe('myShop', this.params.shopId);
    this.layout('layout');
    this.render('myShop', {
        data: {
            shop: Shops.findOne()
        }
    });
}, {name: 'myShop'});
