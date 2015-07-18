describe('shopMenu', function () {
    beforeEach(function() {
        Session.set('dishCategory', null);
        spyOn(Shops, 'findOne').and.returnValue({menu: {dishes: [{name: 'A'}, {name: 'B'}]}});
        renderTemplate(Template.shopMenu, {shopId: 'shop', tableId: 'table'});
    });

    describe('html', function () {
        it('contains 2 dish', function () {
            expect($('ul.menu li').length).toBe(2);
            expect($('ul.menu li').first().text()).toContain('A');
            expect($('ul.menu li').last().text()).toContain('B');
        });
    });
    describe('events', function () {
        it('selects dish to order when click .select-dish', function () {
            Session.set('currentOrder', 'order');
            spyOn(Meteor, 'call');

            $('ul.menu li').last().find('.select-dish').click();

            expect(Meteor.call).toHaveBeenCalledWith('selectDish', 'order', {name: 'B'});
        });
        it('removes dish from order when click .remove-dish', function () {
            Session.set('currentOrder', 'order');
            spyOn(Meteor, 'call');

            $('ul.menu li').last().find('.remove-dish').click();

            expect(Meteor.call).toHaveBeenCalledWith('removeDish', 'order', {name: 'B'});
        });
    });
});
