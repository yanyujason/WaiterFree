describe('update-shop-details', function () {
    describe('helpers', function () {
        describe('errorClass', function () {
            it('returns "error" class when fieldA has error', function () {
                spyOn(Errors, 'isFieldError').and.returnValue(true);
                expect(callHelper(Template.updateShopDetails, 'errorClass', {}, ['fieldA'])).toBe('error');
            });
            it('returns "" class when fieldB does not have error', function () {
                spyOn(Errors, 'isFieldError').and.returnValue(false);
                expect(callHelper(Template.updateShopDetails, 'errorClass', {}, ['fieldB'])).toBe('');
            });
        });

        describe('errorInfo', function () {
            it('returns "error info" class when fieldA has error', function () {
                spyOn(Errors, 'fieldErrorInfo').and.returnValue('error info');
                expect(callHelper(Template.updateShopDetails, 'errorInfo', {}, ['fieldA'])).toBe('error info');
            });
            it('returns "" class when fieldB does not have error', function () {
                spyOn(Errors, 'fieldErrorInfo').and.returnValue('');
                expect(callHelper(Template.updateShopDetails, 'errorInfo', {}, ['fieldB'])).toBe('');
            });
        });
    });
});
