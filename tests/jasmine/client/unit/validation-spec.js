describe('Validation', function() {
    afterEach(function() {
        Validator.clear();
    });

    describe('when doing verification', function () {
        it('not throws error if pass the validation', function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.notEmpty)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: 'Not Empty'
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('throws error base on not empty rule', function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.notEmpty)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: ''
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '', error: 'FieldA不能为空'});
                expect(e.reason).toEqual('FieldA不能为空');
            }
        });

        it('throws error base on customised rule', function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(new Rule(/\d{3}-\d{4}/, '{{field}} should match ddd-dddd'))
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: '123-456'
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '123-456', error: 'FieldA should match ddd-dddd'});
                expect(e.reason).toEqual('FieldA should match ddd-dddd');
            }
        });

        it('throws error base on functional rule', function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(new Rule(function(v) {
                    return (v instanceof Array) && v.length > 0;
                }, '{{field}} should contains more than 1 element'))
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: []
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: [], error: 'FieldA should contains more than 1 element'});
                expect(e.reason).toEqual('FieldA should contains more than 1 element');
            }
        });

        it('throws error base on multiple validations', function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.notEmpty),
                fieldB: new Validation('FieldB').attachRule(Rule.notEmpty)
            });

            try {
                Validator.verify('test-verify', {
                    fieldA: '', fieldB: ''
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(2);
                expect(e.details[0]).toEqual({field: 'fieldA', value: '', error: 'FieldA不能为空'});
                expect(e.details[1]).toEqual({field: 'fieldB', value: '', error: 'FieldB不能为空'});
                expect(e.reason).toEqual('FieldA不能为空, FieldB不能为空');
            }
        });
    });

    describe('when verifying basic type(String)', function () {
        beforeEach(function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.be(String))
            });
        });

        it('allows undefined', function() {
            try {
                Validator.verify('test-verify', {});
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('allows String', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: 'String'
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('throws error for Number', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: 1
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 1, error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });
    });

    describe('when verifying advanced class(Date)', function() {
        beforeEach(function () {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.be(Date))
            });
        });

        it('allows undefined', function() {
            try {
                Validator.verify('test-verify', {});
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('allows Date', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: new Date()
                });
            } catch(e) {
            expect('no error').toBe('error');
            }
        });

        it('throws error for String', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: 'not a date'
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: 'not a date', error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });
    });

    describe('when verifying Array(String) type', function() {
        beforeEach(function() {
            Validator('test-verify', {
                fieldA: new Validation('FieldA').attachRule(Rule.be([String]))
            });
        });

        it('throw errors for undefined', function() {

            try {
                Validator.verify('test-verify', {});
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: undefined, error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });

        it('allows empty []', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: []
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('allows ["a"]', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: ['a']
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });

        it('throw errors for [Number]', function() {

            try {
                Validator.verify('test-verify', {
                    fieldA: [1]
                });
                expect('error').toBe('no error');
            } catch(e) {
                expect(e.error).toEqual('validation-test-verify');
                expect(e.details.length).toEqual(1);
                expect(e.details[0]).toEqual({field: 'fieldA', value: [1], error: 'FieldA类型错误'});
                expect(e.reason).toEqual('FieldA类型错误');
            }
        });


        it('allows ["a"] and ["b"]', function() {
            try {
                Validator.verify('test-verify', {
                    fieldA: ['a']
                });
                Validator.verify('test-verify', {
                    fieldA: ['b']
                });
            } catch(e) {
                expect('no error').toBe('error');
            }
        });
    });
});
