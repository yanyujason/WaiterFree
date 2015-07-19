callHelper = function(template, helperName, context, args) {
    context = context || {};
    args = args || [];
    if(template === Template) {
        return Blaze._globalHelpers[helperName].apply(context, args);
    } else {
        return template.__helpers[' ' + helperName].apply(context, args);
    }
};

renderTemplate = function(template, data) {
    data = data || {};
    Blaze.renderWithData(template, data, $('.integration-fixture')[0]);
};

beforeEach(function() {
    var fixture = $('<div class="integration-fixture"/>');
    $('body').append(fixture);
});

beforeEach(function() {
    Sub = SubMgr('test');
});

afterEach(function() {
    $('.integration-fixture').remove();
});
