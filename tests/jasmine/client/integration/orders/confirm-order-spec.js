describe('confirm order', function () {
    describe('events', function () {
        describe('click .confirm-order', function () {
            beforeEach(function() {
                spyOn(Orders, 'findOne').and.returnValue({_id: 'orderId'});
                renderTemplate(Template.confirmOrder, {shopId: 'shop', tableId: 'table'});
            });

            it('shows popups to confirm order', function () {
                spyOn(Popups, 'confirm');

                $('.confirm-order').click();

                expect(Popups.confirm).toHaveBeenCalled();
            });

            it('calls confirmOrder method when agreed the confirm popup', function () {
                spyOn(Meteor, 'call');
                spyOn(Popups, 'confirm').and.callFake(function(opt, cb) {
                    cb(true);
                });
                $('textarea[name=remark]').val('this is remark');
                $('input[name=invoiceTitle]').val('invoice');

                $('.confirm-order').click();

                expect(Meteor.call).toHaveBeenCalledWith('confirmOrder', 'orderId', 'this is remark', 'invoice', jasmine.any(Function));
            });

            it('calls nothing when disagree the confirm popup', function () {
                spyOn(Meteor, 'call');
                spyOn(Popups, 'confirm').and.callFake(function(opt, cb) {
                    cb(false);
                });

                $('.confirm-order').click();

                expect(Meteor.call).not.toHaveBeenCalled();
            });
        });
    });
});
