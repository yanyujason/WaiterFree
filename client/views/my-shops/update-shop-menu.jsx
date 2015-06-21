function moneyFormatter(price) {
    return price ? `￥${price.toFixed(1)}` : '';
}

Template.updateShopMenu.helpers({
    dishByTag(tag) {
        var dishes = Template.instance().data.shop.menu.dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    }
});

Template.dish.helpers({
    money: moneyFormatter
});

Template.dishOption.helpers({
    money: moneyFormatter
});
