function userUniqId() {
    var userUniqId = localStorage.getItem('userUniqId');
    if(!userUniqId) {
        userUniqId = Meteor.uuid();
        localStorage.setItem('userUniqId', userUniqId);
    }
    return userUniqId;
}

Template.shoppingCartBar.onCreated(function() {
    var shopId = this.data.shopId,
        tableId = this.data.tableId;
    Sub.subscribe('latestActiveOrder', userUniqId(), shopId, tableId);

    Tracker.autorun(() => {
        Sub.dep.depend();
        if(Sub.ready) {
            var order = Orders.findOne({shopId, tableId, status: {$ne: 'close'}});
            if(!order) {
                Meteor.call('newOrder', userUniqId(), shopId, tableId);
            }
        }
    });
});

Template.shoppingCartBar.helpers({
    order() {
        return Orders.findOne({shop: this.shopId, table: this.tableId}, {sort: {createdAt: -1}});
    }
});
