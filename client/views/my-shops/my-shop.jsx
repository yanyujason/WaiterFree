Template.myShop.helpers({
    dishByTag(tag) {
        var dishes = Template.instance().data.shop.menu.dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    }
});
