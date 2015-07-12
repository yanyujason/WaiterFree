Template.myTables.events({
  'click .back_to_main': function (e) {
    e.preventDefault();
    Router.go('myShop', {shopId: this.shopId});
  },

  'click .delete-table': function (e, template) {
    e.preventDefault();
    var tableId = this.tableId,
      shopId = template.data.shopId;

    Popups.confirm({
      message: `确定要删除${this.name}吗？`,
      buttonText: '删除',
      cancelButtonText: '取消'
    }, (isDelete) => {
      if(isDelete) {
        Meteor.call('deleteTable', shopId, tableId, function(error, result) {
          if (error) return throwError(error);
        });
      }
    });
  }
});
