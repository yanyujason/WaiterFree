describe('shopMenu', function () {
    beforeEach(function() {
        Session.set('dishCategory', null);
        spyOn(Shops, 'findOne').and.returnValue({menu: {dishes: [{dishId: 'idA', name: 'A'}, {dishId: 'idB', name: 'B'}]}});
        spyOn(Orders, 'findOne').and.returnValue({});
        renderTemplate(Template.shopMenu, {shopId: 'shop', tableId: 'table'});
    });

    describe('html', function () {
        it('contains 2 dish', function () {
            expect($('ul.menu li').length).toBe(2);
            expect($('ul.menu li').first().text()).toContain('A');
            expect($('ul.menu li').last().text()).toContain('B');
        });
    });

    describe('helpers', function () {
        describe('dishSelected', function () {
            it('returns true when the dish is in the order', function () {
                spyOn(Session, 'get').and.returnValue('orderId');
                expect(callHelper(Template.shopMenu, 'dishSelected', {dishId: 'dish'})).toBe(true);
                expect(Orders.findOne).toHaveBeenCalledWith({_id: 'orderId', 'dishes.dishId': 'dish'});
            });

            it('returns false when the dish is not in the order', function () {
                spyOn(Session, 'get').and.returnValue('orderId');
                Orders.findOne.and.returnValue(null);
                expect(callHelper(Template.shopMenu, 'dishSelected', {dishId: 'dish'})).toBe(false);
                expect(Orders.findOne).toHaveBeenCalledWith({_id: 'orderId', 'dishes.dishId': 'dish'});
            });
        });
    });

    describe('events', function () {
        it('selects dish to order when click .select-dish', function () {
            Session.set('currentOrder', 'order');
            spyOn(Meteor, 'call');

            $('ul.menu li').last().find('.select-dish').click();

            expect(Meteor.call).toHaveBeenCalledWith('selectDish', 'order', {dishId: 'idB', name: 'B'});
        });

        it('removes dish from order when click .remove-dish', function () {
            Session.set('currentOrder', 'order');
            spyOn(Meteor, 'call');

            $('ul.menu li').last().find('.remove-dish').click();

            expect(Meteor.call).toHaveBeenCalledWith('removeDish', 'order', {dishId: 'idB', name: 'B'});
        });
    });
});
