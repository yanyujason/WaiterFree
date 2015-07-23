describe('orderDishControlMixin', function () {
    describe('helpers', function () {
        afterEach(function() {
            Session.set('currentOrder', null);
        });

        describe('dishSelected', function () {
            it('returns true when the dish is in the order', function () {
                spyOn(Orders, 'findOne').and.returnValue({});
                expect(callHelper(orderDishControlMixin, 'dishSelected', {dishId: 'dish'})).toBe(true);
                expect(Orders.findOne).toHaveBeenCalledWith({'dishes.dishId': 'dish'});
            });

            it('returns false when the dish is not in the order', function () {
                spyOn(Orders, 'findOne').and.returnValue(null);
                expect(callHelper(orderDishControlMixin, 'dishSelected', {dishId: 'dish'})).toBe(false);
                expect(Orders.findOne).toHaveBeenCalledWith({'dishes.dishId': 'dish'});
            });
        });

        describe('selectedCount', function () {
            beforeEach(function() {
                spyOn(Orders, 'findOne').and.returnValue({dishes: [{dishId: 'A'}, {dishId: 'B'}, {dishId: 'A'}]});
            });

            it('returns total selected count of this dish', function () {
                expect(callHelper(orderDishControlMixin, 'selectedCount', {dishId: 'A'})).toBe(2);
            });

            it('returns empty if this dish is not selected at all', function () {
                expect(callHelper(orderDishControlMixin, 'selectedCount', {dishId: 'C'})).toBe('');
            });

            it('returns 0 if this dish is not selected at all', function () {
                expect(callHelper(orderDishControlMixin, 'selectedCount', {dishId: 'C'}, [0])).toBe(0);
            });
        });
    });

    describe('events', function () {
        ['shopMenu', 'shoppingCart', 'orderDishDetails'].forEach(function(t) {

            describe('at Template ' + t, function () {
                beforeEach(function() {
                    Session.set('dishCategory', null);
                    spyOn(Shops, 'findOne').and.returnValue({menu: {dishes: [{dishId: 'idA', name: 'A'}, {dishId: 'idB', name: 'B'}]}});
                    spyOn(Orders, 'findOne').and.returnValue({_id: 'order', dishes: [{dishId: 'idA', name: 'A'}]});
                    renderTemplate(Template[t], {shopId: 'shop', tableId: 'table', dishId: 'idB'});
                });

                it('selects dish to order when click .select-dish', function () {
                    spyOn(Meteor, 'call');

                    $('.select-dish').last().click();

                    expect(Meteor.call).toHaveBeenCalledWith('selectDish', 'order', jasmine.any(Object));
                });

                it('removes dish from order when click .remove-dish', function () {
                    spyOn(Meteor, 'call');

                    $('.remove-dish').last().click();

                    expect(Meteor.call).toHaveBeenCalledWith('removeDish', 'order', jasmine.any(Object));
                });
            });
        });

    });
});
