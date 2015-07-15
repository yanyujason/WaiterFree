Template.myTables.onCreated(function() {
  Sub.subscribe('myShop', this.data.shopId);
});

Template.myTables.helpers({
  tables() {
    var shop = Shops.findOne(this.shopId);
    if(shop)
    {
      return shop.tables;
    }
  }
});

Template.myTables.events({
  'click .delete-table': function (e, template) {
    e.preventDefault();
    var tableId = this.tableId,
      shopId = template.data.shopId;

    Popups.confirm({
      message: `确定要删除${this}吗？`,
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
