Template.dishList.onCreated(function() {
    Sub.subscribe('myShop', this.data.shopId);
    Sub.subscribe('qiniuConfig');
});

Template.dishList.helpers({
    menu() {
        var shop = Shops.findOne(this.shopId);
        if(shop) {
            return shop.menu;
        }
    }
});

Template.dishList.helpers({
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
    getAllDishTags(dishes, originPriority) {
        var all = originPriority;

        _.each(dishes, (dish) => {
            all.push(dish.tags);
        });

        return _.uniq(_.flatten(all));
    }
});

Template.dishList.events({
    'click .category': function (e) {
        var tag = $(e.target).data('category');
        Session.set('dishCategory', tag);
    },

    'click .delete-dish': function (e, template) {
        var dishId = this.dishId,
            shopId = template.data.shopId;

        Popups.confirm({
            message: `确定要删除${this.name}吗？`,
            buttonText: '删除',
            cancelButtonText: '取消'
        }, (isDelete) => {
            if(isDelete) {
                Meteor.call('deleteDish', shopId, dishId, function(error, result) {
                    if (error) return throwError(error);
                });
            }
        });
    }
});
