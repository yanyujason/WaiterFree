Errors = new Mongo.Collection(null);

throwError = function(ex) {
    Errors.upsert({error: ex.error}, {error: ex.error, reason: ex.reason, details: ex.details});
};

Errors.isFieldError = (field) => {
    return !!Errors.findOne({'details.field': field});
};

Errors.fieldErrorInfo = (field) => {
    if(!Errors.isFieldError(field)) return '';
    var detail = _.find(Errors.findOne({'details.field': field}).details, (d) => {
        return d.field == field;
    });
    return detail ? detail.error : '';
};
