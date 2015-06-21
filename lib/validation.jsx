var validators = {};

Validator = (senario, validations) => {
    validators[senario] = validations;
};

Validator.verify = (senario, valueSet) => {
    var validations = validators[senario];

    var errors = _.compact(_.map(validations, (v, field) => {
        return v.verify(valueSet[field]);
    }));

    if(errors.length) {
        var ex = new Meteor.Error(`validation-${senario}`);
        ex.details = errors;
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
        var failedRule = _.find(this.rules, (r) => { return !r.check(value)} );
        if(failedRule) {
            return failedRule.errorMessage(this.field);
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
        return this.regex.test(value);
    }

    errorMessage(field) {
        return this.errorMessageTemplate.replace(/\{\{field\}\}/g, field);
    }
}

RuleLocal.notEmpty = new RuleLocal(/.+/, '{{field}}不能为空');

Rule = RuleLocal;
