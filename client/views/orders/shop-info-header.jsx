Template.shopInfoHeader.onCreated(function() {
    Sub.subscribe('shop', this.data.shopId);
});

Template.shopInfoHeader.helpers({
    shop() {
        return Shops.findOne();
    }
});

Template.shopInfoHeader.helpers({
    tableName() {
        var shop = Shops.findOne() || {tables: []};
        var table = _.find(shop.tables, (t) => {
            return t.tableId == this.tableId;
        });
        return table ? table.name : '';
    }
});
