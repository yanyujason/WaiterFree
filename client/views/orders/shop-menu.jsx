Template.shopMenu.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
    Sub.subscribe('qiniuConfig');
});

Template.shopMenu.helpers({
    menu() {
        return (Shops.findOne() || {}).menu;
    }
});

Template.shopMenu.events({
    'click .category': function (e) {
        var tag = $(e.target).data('category');
        Session.set('dishCategory', tag);
    }
});

dishCategoryMixin.mixTo(Template.shopMenu);
orderDishControlMixin.mixTo(Template.shopMenu);
