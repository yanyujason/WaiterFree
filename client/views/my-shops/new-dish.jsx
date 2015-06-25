Template.newDish.events({
    'click .cancel': function (e) {
        e.preventDefault();
        Router.go('myShop', {shopId: this._id});
    },

    'submit form': function (e) {
        e.preventDefault();

        var dish = {
            name: $(e.target).find("[name=name]").val(),
            img: $(e.target).find("[name=img]").val(),
            price: +$(e.target).find("[name=price]").val(),
            desc: $(e.target).find("[name=desc]").val(),
            tags: $(e.target).find('[name=tags]').val().split(',').map((t)=>{return t.trim();}).filter((t)=>{return t;})
        };
        Services.newDish(this._id, dish);
    }
});

Services.newDish = function(shopId, dish) {
    Meteor.call('newDish', shopId, dish, function (error, result) {
        if (error) return throwError(error);
        Router.go('myShop', {shopId: shopId});
    });
};
