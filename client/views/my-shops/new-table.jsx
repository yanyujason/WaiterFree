Template.newTable.onCreated(function() {
  Sub.subscribe('myShop', this.data.shopId);
});

Template.newTable.events({
  'click .btn-cancel': function (e) {
    e.preventDefault();
    Router.go('myTables', {shopId: this.shopId});
  },

  'submit .new-table-form': function (e) {
    e.preventDefault();

    var shopId = this.shopId,
      table = {
        name: $(e.target).find("[name=name]").val().replace(/\s+/g, "")
      };

    Meteor.call('newTable', shopId, table, function(error, result) {
      if (error) return throwError(error);
      Router.go('myTables', {shopId: shopId});
    });
  }
});
