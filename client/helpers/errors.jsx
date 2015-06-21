Errors = new Mongo.Collection(null);

throwError = function(ex) {
    alert(`${ex.reason}\nTODO: This alert will be removed by something, the error is already in Errors collection.`);
    Errors.insert({reason: ex.reason, details: ex.details});
};
