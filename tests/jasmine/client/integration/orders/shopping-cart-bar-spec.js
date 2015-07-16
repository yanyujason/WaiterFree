describe('shoppingCartBar', function () {
    describe('onCreated', function () {
        beforeEach(function() {
            spyOn(localStorage, 'getItem').and.returnValue('userId');
            Session.set('currentOrder', null);
        });

        it('creates new order when I dont have active order in this table', function () {
            spyOn(Sub, 'subscribe').and.callFake(function(sub, _uid, _sid, _tid, callback) {
                if(sub === 'latestActiveOrder') {callback.onReady();}
            });
            spyOn(Orders, 'findOne').and.returnValue(null);
            spyOn(Meteor, 'call');

            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});

            expect(Meteor.call).toHaveBeenCalledWith('newOrder', 'userId', 'shop', 'table', jasmine.any(Function));
        });

        it('sets current order to Session for the new order', function () {
            spyOn(Sub, 'subscribe').and.callFake(function(sub, _uid, _sid, _tid, callback) {
                if(sub === 'latestActiveOrder') {callback.onReady();}
            });
            spyOn(Orders, 'findOne').and.returnValue(null);
            spyOn(Meteor, 'call').and.callFake(function(m, uid, sid, tid, cb) {
                cb(null, 'order');
            });

            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});

            expect(Session.get('currentOrder')).toBe('order');
        });

        it('does not create new order when I have the order on this table', function () {
            spyOn(Orders, 'findOne').and.returnValue({_id: 'order'});
            spyOn(Meteor, 'call');

            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});

            expect(Meteor.call).not.toHaveBeenCalled();
        });

        it('sets current order to Session for the existing order', function () {
            spyOn(Sub, 'subscribe').and.callFake(function(sub, _uid, _sid, _tid, callback) {
                if(sub === 'latestActiveOrder') {callback.onReady();}
            });
            spyOn(Orders, 'findOne').and.returnValue({_id: 'order'});

            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});

            expect(Session.get('currentOrder')).toBe('order');
        });
    });
});
