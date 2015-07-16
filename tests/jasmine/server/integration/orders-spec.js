describe('orders collection methods', function () {
    describe('newOrder', function () {
        it('creates new order for consumer who is not login', function (done) {
            Meteor.call('newOrder', 'uuid', 'shop', 'table', function(e, orderId) {
                expect(orderId).toBeDefined();
                var order = Orders.findOne(orderId);
                expect(order.user).toBe('uuid');
                expect(order.shop).toBe('shop');
                expect(order.table).toBe('table');
                expect(order.price).toBe(0);
                expect(order.status).toBe('open');
                done();
            });
        });

        it('creates new order for consumer who is login', function () {
            spyOn(Meteor, 'userId').and.returnValue('userId');
            Meteor.call('newOrder', 'uuid', 'shop', 'table', function(e, orderId) {
                expect(orderId).toBeDefined();
                var order = Orders.findOne(orderId);
                expect(order.user).toBe('userId');
                expect(order.shop).toBe('shop');
                expect(order.table).toBe('table');
                expect(order.price).toBe(0);
                expect(order.status).toBe('open');
                done();
            });
        });
    });

    describe('select dish', function () {
        var orderId;
        beforeEach(function() {
            orderId = Orders.insert({user: 'uuid', shop: 'shop', table: 'table', price: 0, dishes: [], status: 'open'});
        });

        it('pushes dish to order', function (done) {
            spyOn(Meteor, 'uuid').and.returnValue('uuid');
            var dish = {name: 'dish', price: 10};
            Meteor.call('selectDish', orderId, dish, function() {
                expect(Orders.findOne(orderId).dishes.length).toBe(1);
                expect(Orders.findOne(orderId).dishes[0]).toEqual({
                    name: 'dish', price: 10, serialId: 'uuid'
                });
                done();
            });
        });

        it('increases total price', function(done) {
            var dish = {name: 'dish', price: 10};
            Meteor.call('selectDish', orderId, dish, function() {
                expect(Orders.findOne(orderId).price).toBe(10);
                done();
            });
        })
    });

    describe('remove dish', function () {
        var orderId;
        beforeEach(function() {
            orderId = Orders.insert({user: 'uuid', shop: 'shop', table: 'table', price: 25, dishes: [
                {name:'A', price: 10, serialId: 'id1'}, {name:'B', price: 15, serialId: 'id2'}
            ], status: 'open'});
        });

        it('removes dish from order', function (done) {
            var dish = {name:'B', price: 15, serialId: 'id2'};
            Meteor.call('removeDish', orderId, dish, function() {
                expect(Orders.findOne(orderId).dishes.length).toBe(1);
                expect(Orders.findOne(orderId).dishes[0]).toEqual({name:'A', price: 10, serialId: 'id1'});
                done();
            });
        });

        it('decreases price from order', function (done) {
            var dish = {name:'B', price: 15, serialId: 'id2'};
            Meteor.call('removeDish', orderId, dish, function() {
                expect(Orders.findOne(orderId).price).toBe(10);
                done();
            });
        });
    });
});
