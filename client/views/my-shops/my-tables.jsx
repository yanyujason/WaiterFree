Template.myTables.onRendered(function(){
  var dataContext = Template.currentData(),
    tables = dataContext.tables;

  _.each(tables, function(table){
    var tableOrderUrl = `${location.protocol}//${location.host}/orders/${dataContext.shopId}/${table}`;
    this.$('.qr-code.' + table).qrcode({text: tableOrderUrl, width: 100, height: 100});
  });
});


Template.myTables.events({
  'click .back_to_main': function (e) {
    e.preventDefault();
    Router.go('myShop', {shopId: this._id});
  },

  'click .delete-table': function (e, template) {
    e.preventDefault();

    var table = this.table,
      shopId = template.data._id;

    Popups.confirm({
      message: `确定要删除${this.table}吗？`,
      buttonText: '删除',
      cancelButtonText: '取消'
    }, (isDelete) => {
      if(isDelete) {
        Meteor.call('deleteTable', shopId, table, function(error, result) {
          if (error) return throwError(error);
        });
      }
    });
  }
});
