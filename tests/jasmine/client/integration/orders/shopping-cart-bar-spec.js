describe('shoppingCartBar', function () {
    describe('events', function () {
        beforeEach(function() {
            renderTemplate(Template.shoppingCartBar, {shopId: 'shop', tableId: 'table'});
        });

        describe('click .confirm-order', function () {
            it('shows popup to make sure consumer has dish in order', function () {
                spyOn(Orders, 'findOne').and.returnValue({price: 0});
                spyOn(Popups, 'alert');

                $('.confirm-order').click();

                expect(Popups.alert).toHaveBeenCalled();
            });
        });
    });
});
