function moneyFormatter(price) {
    return price ? `￥${price.toFixed(1)}` : '';
}

Template.myShop.helpers({
    dishByTag(tag) {
        var dishes = Template.instance().data.menu.dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    },
    categoryDishes(menu) {
    	var tag = Session.get('dishCategory');
    	if(!tag) return menu.dishes;
    	return _.filter(menu.dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    },
    activeCategory(tag) {
    	return tag == Session.get('dishCategory') ? 'active' : '';
    }
});

Template.dish.helpers({
    money: moneyFormatter
});

Template.dishOption.helpers({
    money: moneyFormatter
});

Template.myShop.events({
	'click .category': function(e) {
		var tag = $(e.target).data('category');
		Session.set('dishCategory', tag);
	}
});