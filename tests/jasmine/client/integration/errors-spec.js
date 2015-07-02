describe('errors', function () {
    beforeEach(function() {
        Errors.remove({});
    });
    afterEach(function() {
        Errors.remove({});
    });

    describe('throwError', function () {
        it('stores new error', function () {
            throwError(new Meteor.Error('ex'));
            expect(Errors.findOne({}).error).toBe('ex');
        });

        it('stores new error instead of old one', function () {
            throwError(new Meteor.Error('ex'));
            throwError(new Meteor.Error('newEx'));
            expect(Errors.find({}).count()).toBe(1);
            expect(Errors.findOne({}).error).toBe('newEx');
        });
    });


    describe('errorClass', function () {
        it('returns "error" class when fieldA has error', function () {
            Errors.insert({details: [{field: 'fieldA'}]});
            expect(callHelper(Template, 'errorClass', {}, ['fieldA'])).toBe('error');
        });
        it('returns "" class when fieldB does not have error', function () {
            Errors.insert({details: [{field: 'fieldA'}]});
            expect(callHelper(Template, 'errorClass', {}, ['fieldB'])).toBe('');
        });
    });

    describe('fieldErrorInfo', function () {
        it('returns "error info" class when fieldA has error', function () {
            Errors.insert({details: [{field: 'fieldA', error: 'error info'}]});
            expect(callHelper(Template, 'errorInfo', {}, ['fieldA'])).toBe('error info');
        });
        it('returns "" class when fieldB does not have error', function () {
            Errors.insert({details: [{field: 'fieldA'}]});
            expect(callHelper(Template, 'errorInfo', {}, ['fieldB'])).toBe('');
        });
    });

    describe('generalError', function () {
        it('returns "error info" class when a general error', function () {
            Errors.insert({reason: 'general'});
            expect(callHelper(Template, 'generalError')).toBe('general');
        });
    });
});
