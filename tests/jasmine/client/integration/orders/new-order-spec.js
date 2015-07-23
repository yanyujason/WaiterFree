describe('newOrder', function () {
    describe('onCreated', function () {
        beforeEach(function() {
            spyOn(localStorage, 'getItem').and.returnValue('userId');
            Session.set('currentOrder', null);
            spyOn(Sub, 'onReady').and.callFake(function(cb) { cb(); });
        });

        it('creates new order when I dont have active order in this table', function () {
            spyOn(Orders, 'findOne').and.returnValue(null);
            spyOn(Meteor, 'call');

            renderTemplate(Template.newOrder, {shopId: 'shop', tableId: 'table'});

            expect(Meteor.call).toHaveBeenCalledWith('newOrder', 'userId', 'shop', 'table');
        });

        it('does not create new order when I have the order on this table', function () {
            spyOn(Orders, 'findOne').and.returnValue({_id: 'order'});
            spyOn(Meteor, 'call');

            renderTemplate(Template.newOrder, {shopId: 'shop', tableId: 'table'});

            expect(Meteor.call).not.toHaveBeenCalled();
        });
    });
});
