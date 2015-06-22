var validators = {};

Validator = (senario, validations) => {
    validators[senario] = validations;
};

Validator.verify = (senario, valueSet) => {
    var validations = validators[senario];

    var errors = _.filter(_.map(validations, (v, field) => {
        return {field: field, error: v.verify(valueSet[field])};
    }), (e) => {
        return e.error;
    });

    if(errors.length) {
        var ex = new Meteor.Error(`validation-${senario}`);
        ex.details = errors;
        ex.reason = _.map(errors, (e) => {return e.error;}).join(', ');
        throw ex;
    }
};

Validator.verifyOwner = (isOwner) => {
    if(!isOwner()) {
        var ex = new Meteor.Error(`validation-owner`);
        ex.details = ['权限校验错误'];
        ex.reason = errors.join(', ');
        throw ex;
    }
};

Validator.clear = () => {
    validators = {};
};

class ValidationLocal {
    constructor(field) {
        this.field = field;
        this.rules = [];
    }

    attachRule(rule) {
        if(!_.contains(this.rules, rule)) {
            this.rules.push(rule);
        }
        return this;
    }

    verify(value) {
        if(typeof value !== 'undefined') {
            var failedRule = _.find(this.rules, (r) => { return !r.check(value)} );
            if(failedRule) {
                return failedRule.errorMessage(this.field);
            }
        }
    }
}

Validation = ValidationLocal;

class RuleLocal {
    constructor(regex, errorMessageTemplate) {
        this.regex = regex;
        this.errorMessageTemplate = errorMessageTemplate;
    }

    check(value) {
        if(this.regex instanceof RegExp) {
            return this.regex.test(value);
        } else if(this.regex instanceof Function) {
            return this.regex(value);
        }
    }

    errorMessage(field) {
        return this.errorMessageTemplate.replace(/\{\{field\}\}/g, field);
    }
}

var patterns = [[String, 'string'], [Number, 'number'], [Boolean, "boolean"]];
var getPattern = (clazz) => {
    var p = _.find(patterns, (p) => {
        return p[0] === clazz;
    });
    if(p) return p[1];
};
RuleLocal.be = (clazz) => {
    var check = (v) => {
        var pattern = getPattern(clazz);
        if(pattern) {
            return typeof v === pattern;
        } else if(clazz instanceof Array) {
            clazz = clazz[0];
            return v instanceof Array && _.all(v, (e) => {return check(e, clazz)});
        } else {
            return (v instanceof clazz);
        }
    };

    return new RuleLocal(check, '{{field}}类型错误');
};
RuleLocal.notEmpty = new RuleLocal(/.+/, '{{field}}不能为空');
RuleLocal.telephone = new RuleLocal(/^(\d{3,4}-\d{7,8})|\d{11}$/, '{{field}}格式有误');

Rule = RuleLocal;
