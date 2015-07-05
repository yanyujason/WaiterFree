Template.myShop.helpers({
    categoryDishes(dishes) {
        var tag = Session.get('dishCategory');
        if (!tag) return dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    },
    activeCategoryClass(tag) {
        return tag == Session.get('dishCategory') ? 'active' : '';
    }
});

Template.myShop.events({
    'click .category': function (e) {
        var tag = $(e.target).data('category');
        Services.myShop.changeDishTag(tag);
    },

    'click .delete-dish': function (e, template) {
        var dishId = this.dishId,
          shopName = template.data.name;

        Services.myShop.deleteMyDish(shopName, dishId);
    }
});

Services.myShop = {
    changeDishTag(tag) {
        Session.set('dishCategory', tag);
    },

    deleteMyDish(shopName, dishName) {
        Meteor.call('deleteDish', shopName, dishName, function(error, result) {
            if (error) return throwError(error);
        });
    }
};

Template.dish.helpers({
    money: Formatter.money,
    imgPath: Formatter.imgPath
});

Template.dishOption.helpers({
    money: Formatter.money
});
