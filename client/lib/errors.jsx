Errors = new Mongo.Collection(null);

throwError = function(ex) {
    Errors.upsert({error: ex.error}, {error: ex.error, reason: ex.reason, details: ex.details});
};
