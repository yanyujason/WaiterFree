dishCategoryMixin = new Mixin();

dishCategoryMixin.helpers({
    categoryDishes(dishes) {
        var tag = Session.get('dishCategory');
        if (!tag) return dishes;
        return _.filter(dishes, (dish) => {
            return _.contains(dish.tags, tag);
        });
    },
    activeCategoryClass(tag) {
        return tag == Session.get('dishCategory') ? 'active' : '';
    },
    getAllDishTags(dishes, originPriority=[]) {
        var all = [];
        all.push(...originPriority);
        _.each(dishes, (dish) => {
            all.push(...dish.tags);
        });
        return _.uniq(_.compact(all));
    }
});

