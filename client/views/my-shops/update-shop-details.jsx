Template.updateShopDetails.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentShopId = this._id;
        var shopDetails = {
            name: $(e.target).find('[name=name]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            address: $(e.target).find('[name=address]').val(),
            tel: $(e.target).find('[name=tel]').val(),
            tags: $(e.target).find('[name=tags]').val().split(',').map((t)=>{return t.trim();})
        };

        Shops.update(currentShopId, {$set: shopDetails}, function(error) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('myShop', {shopId: currentShopId});
            }
        });
    },

    'click .cancel-update': function(e) {
        e.preventDefault();
        Router.go('myShop', {shopId: this._id});
    }
});
