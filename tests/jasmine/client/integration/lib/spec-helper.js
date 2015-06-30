callHelper = function(template, helperName, context, args) {
    context = context || {};
    args = args || [];
    return template.__helpers[' ' + helperName].apply(context, args);
};
