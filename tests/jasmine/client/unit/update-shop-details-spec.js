describe('update-shop-details', function () {
    describe('helpers', function () {
        describe('errorClass', function () {
            afterEach(function() {
                Errors.remove({});
            });

            it('returns "error" class when fieldA has error', function () {
                Errors.insert({details: [{field: 'fieldA'}]});
                expect(callHelper(Template.updateShopDetails, 'errorClass', {}, ['fieldA'])).toBe('error');
            });
            it('returns "" class when fieldB does not have error', function () {
                Errors.insert({details: [{field: 'fieldA'}]});
                expect(callHelper(Template.updateShopDetails, 'errorClass', {}, ['fieldB'])).toBe('');
            });
        });

        describe('errorInfo', function () {
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
});
