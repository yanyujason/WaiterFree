describe('update-shop-details', function () {
    describe('events', function () {
        beforeEach(function() {
            renderTemplate(Template.updateShopDetails, {_id: 'shop'});
        });

        it('goes to myShop when click .cancel', function () {
            spyOn(Router, 'go');
            $('.cancel').click();
            expect(Router.go).toHaveBeenCalledWith('myShop', {shopId: 'shop'});
        });

        it('update shop details when submit form', function() {
            spyOn(Meteor, 'call');

            $('.update-shop input[name=name]').val('Name');
            $('.update-shop input[name=desc]').val('Desc');
            $('.update-shop input[name=address]').val('Address');
            $('.update-shop input[name=tel]').val('Tel');
            $('.update-shop input[name=tags]').val('Tag1 Tag2');
            $('.update-shop').submit();

            expect(Meteor.call).toHaveBeenCalledWith('shopDetailsUpdate', 'shop', {
                name: 'Name', desc: 'Desc', address: 'Address', tel: 'Tel', tags: ['Tag1', 'Tag2']
            }, jasmine.any(Function));
        });

        it('gose to myShop when submit form success', function() {
            spyOn(Meteor, 'call');
            spyOn(Router, 'go');

            $('.update-shop').submit();

            Meteor.call.calls.mostRecent().args[3]();

            expect(Router.go).toHaveBeenCalledWith('myShop', {shopId: 'shop'});
        });
    });
});
