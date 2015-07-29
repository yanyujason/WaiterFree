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

        it('creates new order for consumer who is login', function (done) {
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
            orderId = Orders.insert({user: 'uuid', shop: 'shop', table: 'table', price: 0, dishCount: 0, dishes: [], status: 'open'});
            spyOn(Shops, 'findOne').and.returnValue({menu:{dishes: [{dishId: 'A', price: 10}, {dishId: 'B', price: 15}]}});
        });

        it('pushes dish to order and increase total price', function (done) {
            Meteor.call('selectDish', orderId, 'A', function() {
                expect(Orders.findOne(orderId).price).toBe(10);
                expect(Orders.findOne(orderId).dishCount).toBe(1);

                expect(Orders.findOne(orderId).dishes.length).toBe(1);
                expect(Orders.findOne(orderId).dishes[0]).toEqual({
                    dishId: 'A', price: 10, count: 1
                });
                done();
            });
        });

        it('increases dish count', function (done) {
            Meteor.call('selectDish', orderId, 'A', function() {
                Meteor.call('selectDish', orderId, 'A', function() {
                    expect(Orders.findOne(orderId).price).toBe(20);
                    expect(Orders.findOne(orderId).dishCount).toBe(2);

                    expect(Orders.findOne(orderId).dishes.length).toBe(1);
                    expect(Orders.findOne(orderId).dishes[0]).toEqual({
                        dishId: 'A', price: 10, count: 2
                    });
                    done();
                });
            });
        });
    });

    describe('remove dish', function () {
        var orderId;
        beforeEach(function() {
            orderId = Orders.insert({user: 'uuid', shop: 'shop', table: 'table', price: 40, dishCount: 3, dishes: [
                {dishId: 'idA', name:'A', price: 10, count: 1}, {dishId: 'idB', name:'B', price: 15, count: 2}
            ]});
        });

        it('removes dish from order and decrease total price', function (done) {
            Meteor.call('removeDish', orderId, 'idA', function() {
                expect(Orders.findOne(orderId).price).toBe(30);
                expect(Orders.findOne(orderId).dishCount).toBe(2);

                expect(Orders.findOne(orderId).dishes.length).toBe(1);
                expect(Orders.findOne(orderId).dishes[0]).toEqual({dishId: 'idB', name:'B', price: 15, count: 2});
                done();
            });
        });

        it('decreases dish count', function () {
            Meteor.call('removeDish', orderId, 'idB', function() {
                expect(Orders.findOne(orderId).price).toBe(25);
                expect(Orders.findOne(orderId).dishCount).toBe(2);

                expect(Orders.findOne(orderId).dishes.length).toBe(2);
                expect(Orders.findOne(orderId).dishes[0]).toEqual({dishId: 'idA', name:'A', price: 10, count: 1});
                expect(Orders.findOne(orderId).dishes[1]).toEqual({dishId: 'idB', name:'B', price: 15, count: 1});
                done();
            });
        });

        it('does nothing when dish is not in order', function () {
            Meteor.call('removeDish', orderId, 'idC', function() {
                expect(Orders.findOne(orderId).price).toBe(40);
                expect(Orders.findOne(orderId).dishCount).toBe(3);
                done();
            });
        });
    });

    describe('confirm order', function () {
        var orderId;
        beforeEach(function() {
            orderId = Orders.insert({user: 'uuid', shop: 'shop', table: 'table', price: 40, dishCount: 3, dishes: [
                {dishId: 'idA', name:'A', price: 10, count: 1}, {dishId: 'idB', name:'B', price: 15, count: 2}
            ]});
        });

        it('changes order status', function (done) {
            Meteor.call('confirmOrder', orderId, '', '', function() {
                expect(Orders.findOne(orderId).status).toBe('confirmed');
                done();
            });
        });

        it('update order remark', function (done) {
            Meteor.call('confirmOrder', orderId, 'this is remark', '', function() {
                expect(Orders.findOne(orderId).remark).toBe('this is remark');
                done();
            });
        });

        it('update order invoice title', function (done) {
            Meteor.call('confirmOrder', orderId, 'this is remark', 'title', function() {
                expect(Orders.findOne(orderId).invoiceTitle).toBe('title');
                done();
            });
        });

        it('sets updatedAt time stamp', function () {
            Meteor.call('confirmOrder', orderId, '', '', function() {
                expect(Orders.findOne(orderId).updatedAt).toBeDefined();
                done();
            });
        });
    });
});
