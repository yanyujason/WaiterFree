Template.updateDishDetails.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentShopId = this._id;
    var dishDetails = {
      name: $(e.target).find('[name=name]').val(),
      img: $(e.target).find("[name=img]").val(),
      price: $(e.target).find('[name=price]').val(),
      desc: $(e.target).find('[name=desc]').val(),
      tags: $(e.target).find('[name=tags]').val().split(',').map((t)=> {
        return t.trim();
      }).filter((t)=> {
        return t;
      })
    };
    Services.updateDishDetails(currentShopId, dishDetails);
  },

  'click .cancel': function(e) {
    e.preventDefault();
    Router.go('myShop', {shopId: this._id});
  }
});

Services.updateDishDetails = function(currentShopId, dishDetails) {
  Meteor.call('dishDetailsUpdate', currentShopId, dishDetails, function(error, result) {
    if (error) return throwError(error);
    Router.go('myShop', {shopId: currentShopId});
  });
};
