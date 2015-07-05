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

Popups.alert = (options, callback) => {
    if(typeof options === 'string') {
        options = {message: options};
    }
    options.buttonText = options.buttonText || 'OK';
    Popups.show('alertPopup', {
        message: options.message,
        buttonText: options.buttonText,
        callback: callback
    });
};

Popups.confirm = (options, callback) => {
    if(typeof options === 'string') {
        options = {message: options};
    }
    options.buttonText = options.buttonText || 'OK';
    options.cancelButtonText = options.cancelButtonText || 'Cancel';
    Popups.show('confirmPopup', {
        message: options.message,
        buttonText: options.buttonText,
        cancelButtonText: options.cancelButtonText,
        callback: callback
    });
};

Template.popup.events({
    'click .popup-close': function() {
        Popups.remove();
    }
});

Template.alertPopup.events({
    'click .alert-popup .btn-confirm': function() {
        Popups.remove();
        this.callback();
    }
});

Template.confirmPopup.events({
    'click .confirm-popup .btn-confirm': function() {
        Popups.remove();
        this.callback(true);
    }
});

Template.confirmPopup.events({
    'click .confirm-popup .btn-cancel': function() {
        Popups.remove();
        this.callback(false);
    }
});
