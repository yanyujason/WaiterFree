describe('shoppingCartBar', function () {
    describe('onCreated', function () {
        it('creates new order when I dont have active order in this table', function () {
            spyOn(localStorage, 'getItem').and.returnValue('userId');
            spyOn(Orders, 'findOne').and.returnValue(null);
            spyOn(Meteor, 'call');

            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});

            Sub.ready = true;
            Sub.dep.changed();
            Tracker.flush();

            expect(Meteor.call).toHaveBeenCalledWith('newOrder', 'userId', 'shop', 'table');
        });

        it('doesnt create new order when I have the order on this table', function () {
            spyOn(localStorage, 'getItem').and.returnValue('userId');
            spyOn(Orders, 'findOne').and.returnValue({});
            spyOn(Meteor, 'call');

            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});

            Sub.ready = true;
            Sub.dep.changed();
            Tracker.flush();

            expect(Meteor.call).not.toHaveBeenCalled();
        });
    });
});
