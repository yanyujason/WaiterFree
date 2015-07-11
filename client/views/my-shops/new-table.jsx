Template.newTable.events({
  'click .btn-cancel': function (e) {
    e.preventDefault();
    Router.go('myTables', {shopId: this.shopId});
  },

  'submit .new-table-form': function (e) {
    e.preventDefault();

    var shopId = this.shopId,
      table =  $(e.target).find("[name=name]").val();

    Meteor.call('newTable', shopId, table, function(error, result) {
      if (error) return throwError(error);
      Router.go('myTables', {shopId: shopId});
    });
  }
});
