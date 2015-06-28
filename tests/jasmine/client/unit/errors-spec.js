describe('errors', function () {
    describe('isFieldError', function () {
        afterEach(function() {
            Errors.remove({});
        });

        it('returns true class when fieldA has error', function () {
            Errors.insert({details: [{field: 'fieldA'}]});
            expect(callHelper(Template.updateShopDetails, 'errorClass', {}, ['fieldA'])).toBeTruthy();
        });
        it('returns false class when fieldB does not have error', function () {
            Errors.insert({details: [{field: 'fieldA'}]});
            expect(callHelper(Template.updateShopDetails, 'errorClass', {}, ['fieldB'])).toBeFalsy();
        });
    });

    describe('fieldErrorInfo', function () {
        afterEach(function() {
            Errors.remove({});
        });

        it('returns "error info" class when fieldA has error', function () {
            Errors.insert({details: [{field: 'fieldA', error: 'error info'}]});
            expect(callHelper(Template.updateShopDetails, 'errorInfo', {}, ['fieldA'])).toBe('error info');
        });
        it('returns "" class when fieldB does not have error', function () {
            Errors.insert({details: [{field: 'fieldA'}]});
            expect(callHelper(Template.updateShopDetails, 'errorInfo', {}, ['fieldB'])).toBe('');
        });
    });
});
