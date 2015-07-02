Errors = new Mongo.Collection(null);

throwError = function(ex) {
    Errors.upsert({}, {error: ex.error, reason: ex.reason, details: ex.details});
};

function isFieldError(field) {
    return !!Errors.findOne({'details.field': field});
}

function fieldErrorInfo(field) {
    if(!isFieldError(field)) return '';
    var detail = _.find(Errors.findOne({'details.field': field}).details, (d) => {
        return d.field == field;
    });
    return detail ? detail.error : '';
}

function generalErrorInfo() {
    var error = Errors.findOne({'details.field': {$exists: false}});
    return error ? error.reason : '';
}

Template.registerHelper('errorClass', (field) => {
    return isFieldError(field) ? 'error' : '';
});

Template.registerHelper('errorInfo', (field) => {
    return fieldErrorInfo(field);
});

Template.registerHelper('generalError', () => {
    return generalErrorInfo();
});
