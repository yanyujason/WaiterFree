function moneyFormatter(price) {
    return price ? `￥${price.toFixed(1)}` : '';
}

Template.myShop.helpers({
    categoryDishes(dishes) {
        var tag = Session.get('dishCategory');
        if (!tag) return dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    },
    activeCategory(tag) {
        return tag == Session.get('dishCategory') ? 'active' : '';
    }
});

Template.myShop.events({
    'click .category': function (e) {
        var tag = $(e.target).data('category');
        Session.set('dishCategory', tag);
    }
});

Template.dish.helpers({
    money: moneyFormatter
});

Template.dishOption.helpers({
    money: moneyFormatter
});
