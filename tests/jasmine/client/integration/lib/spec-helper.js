callHelper = function(template, helperName, context, args) {
    context = context || {};
    args = args || [];
    return template.__helpers[' ' + helperName].apply(context, args);
};

renderTemplate = function(template, data) {
    Blaze.renderWithData(template, data, $('.integration-fixture')[0]);
};

beforeEach(function() {
    var fixture = $('<div class="integration-fixture"/>');
    $('body').append(fixture);
});

afterEach(function() {
    $('.integration-fixture').remove();
});
