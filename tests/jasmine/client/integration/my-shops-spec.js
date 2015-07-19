describe('myShops', function () {
    describe('html', function () {
        it('shows shop list', function () {
            spyOn(Shops, 'find').and.returnValue([{_id: 'idA', name: 'Shop1'}, {_id: 'idB', name: 'Shop2'}]);

            renderTemplate(Template.myShops);

            var shopList = $('.shop-name');
            expect(shopList.length).toBe(2);
            expect(shopList.first()).toHaveText('Shop1');
            expect(shopList.last()).toHaveText('Shop2');
        });
    });
});
