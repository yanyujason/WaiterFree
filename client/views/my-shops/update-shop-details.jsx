Template.updateShopDetails.helpers({
    errorClass(field) {
        return Errors.findOne({'details.field': field}) ? 'error' : '';
    },
    errorInfo(field) {
        var error = Errors.findOne({'details.field': field});
        if(!error) return '';
        var detail = _.find(Errors.findOne({'details.field': field}).details, (d) => {
            return d.field == field;
        });
        return detail ? detail.error : '';
    }
});
Template.updateShopDetails.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentShopId = this._id;
        var shopDetails = {
            name: $(e.target).find('[name=name]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            address: $(e.target).find('[name=address]').val(),
            tel: $(e.target).find('[name=tel]').val(),
            tags: $(e.target).find('[name=tags]').val().split(/[,\s]/).map((t)=>{return t.trim();}).filter((t)=>{return t;})
        };
        Services.updateShopDetails(currentShopId, shopDetails);
    },

    'click .cancel': function(e) {
        e.preventDefault();
        Router.go('myShop', {shopId: this._id});
    }
});

Services.updateShopDetails = function(currentShopId, shopDetails) {
    Meteor.call('shopDetailsUpdate', currentShopId, shopDetails, function(error, result) {
        if (error) return throwError(error);
        Router.go('myShop', {shopId: currentShopId});
    });
};
