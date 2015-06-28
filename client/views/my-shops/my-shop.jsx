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
    }
});

Services.myShop = {
    changeDishTag(tag) {
        Session.set('dishCategory', tag);
    }
};

Template.dish.helpers({
    money: Formatter.money,
    imgPath: Formatter.imgPath
});

Template.dishOption.helpers({
    money: Formatter.money
});
