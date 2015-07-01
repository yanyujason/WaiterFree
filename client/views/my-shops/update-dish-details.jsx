Template.updateDishDetails.helpers({
  errorClass(field) {
    return Errors.isFieldError(field) ? 'error' : '';
  },
  errorInfo(field) {
    return Errors.fieldErrorInfo(field);
  }
});


Template.updateDishDetails.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentShopId = this.shopId;
    var dishDetails = {
      name: $(e.target).find('[name=name]').val(),
      price: parseFloat($(e.target).find('[name=price]').val()),
      desc: $(e.target).find('[name=desc]').val(),
      tags: $(e.target).find('[name=tags]').val().split(',').map((t)=> {
        return t.trim();
      }).filter((t)=> {
        return t;
      }),
      dishId: this.dish.dishId,
      img: this.dish.img
    };
    Services.updateDishDetails(currentShopId, dishDetails);
  },

  'click .cancel': function(e) {
    e.preventDefault();
    Router.go('myShop', {shopId: this.shopId});
  }
});

Services.updateDishDetails = function(currentShopId, dishDetails) {
  Meteor.call('dishDetailsUpdate', currentShopId, dishDetails, function(error, result) {
    if (error) return throwError(error);
    Router.go('myShop', {shopId: currentShopId});
  });
};
