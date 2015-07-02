var validators = {};

Validator = (scenario, validations) => {
    validators[scenario] = validations;
};

Validator.verify = (scenario, valueSet) => {
    if(typeof scenario === 'string') {
        verifyScenario(scenario, valueSet);
    } else if(scenario instanceof RuleLocal) {
        verifyRule(scenario);
    }
};

function verifyScenario(scenario, valueSet) {
    var validations = validators[scenario];

    var errors = _.filter(_.map(validations, (v, field) => {
        return {field: field, value: valueSet[field], error: v.verify(valueSet[field])};
    }), (e) => {
        return e.error;
    });

    if(errors.length) {
        var ex = new Meteor.Error(`validation-scenario-${scenario}`);
        ex.details = errors;
        ex.reason = _.map(errors, (e) => {return e.error;}).join(', ');
        throw ex;
    }
}

function verifyRule(rule) {
    if(!rule.check()) {
        var error = rule.errorMessage();
        var ex = new Meteor.Error('validation-rule');
        ex.details = [{error: error || '验证错误'}];
        ex.reason = _.map(ex.details, (e) => {return e.error;}).join(', ');
        throw ex;
    }
}

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
        this.errorMessageTemplate = errorMessageTemplate || '';
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
    var check = (v, clazz) => {
        var pattern = getPattern(clazz);
        if(pattern) {
            return typeof v === pattern || typeof v === 'undefined';
        } else if(clazz instanceof Array) {
            clazz = clazz[0];
            return v instanceof Array && _.all(v, (e) => {return check(e, clazz)});
        } else {
            return (v instanceof clazz) || typeof v === 'undefined';
        }
    };

    return new RuleLocal((v) => {return check(v, clazz)} , '{{field}}类型错误');
};
RuleLocal.notEmpty = new RuleLocal(/.+/, '{{field}}不能为空');
RuleLocal.notEmptyArray = new RuleLocal((v) => {return v.length > 0;}, '{{field}}不能为空');
RuleLocal.positiveNumber = new RuleLocal((v) => {return v > 0}, '{{field}}应为正数');
RuleLocal.telephone = new RuleLocal(/^(\d{3,4}-\d{7,8})$|^\d{11}$/, '{{field}}格式有误');
RuleLocal.clerkNumber = new RuleLocal(/^[\w\d]+$/, '{{field}}只能使用数字和字母');
RuleLocal.email = new RuleLocal(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, '{{field}}格式有误');
RuleLocal.password = new RuleLocal(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, '{{field}}至少8位，包含至少一个数字和字母');
RuleLocal.passwordConfirm = new RuleLocal((vArray) => {return vArray[0] == vArray[1]}, '{{field}}不一致');

Rule = RuleLocal;
