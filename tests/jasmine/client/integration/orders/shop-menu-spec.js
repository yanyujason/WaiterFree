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
});
