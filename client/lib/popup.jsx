Popups = {};

Popups.show = (template, dataContext, options) => {
    var templateName = template;
    if(typeof template !== 'string') {
        templateName = template.viewName.match(/^Template\.(.+)$/)[1];
    }
    dataContext = dataContext || {};
    options = options || {};
    var data = {popupTemplateName: templateName, data: dataContext, options: options};
    Popups.currentView = Blaze.renderWithData(Template.popup, data, document.body);
};

Popups.remove = () => {
    Blaze.remove(Popups.currentView);
};

Template.popup.events({
    'click .popup-close': function() {
        Popups.remove();
    }
});
