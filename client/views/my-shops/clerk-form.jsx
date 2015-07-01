Template.clerkForm.helpers({
    errorClass(field) {
        return Errors.isFieldError(field) ? 'error' : '';
    },
    errorInfo(field) {
        return Errors.fieldErrorInfo(field);
    },
    title() {
        return this.type === 'new' ? '添加店员' : '修改店员';
    },
    submit() {
        return this.type === 'new' ? '添加' : '修改';
    }
});

Template.clerkForm.events({
    'submit .clerk-form': function(e) {
        e.preventDefault();

        var shopId = this.shopId;
        var clerkProfile = {
            name: $(e.target).find('[name=name]').val(),
            email: $(e.target).find('[name=email]').val(),
            password: $(e.target).find('[name=password]').val(),
            passwordConfirm: [$(e.target).find('[name=password]').val(), $(e.target).find('[name=password2]').val()]
        };

        if(this.type === 'new') {
            Meteor.call('newClerk', shopId, clerkProfile, function(error, result) {
                if (error) return throwError(error);
                Router.go('clerkList', {shopId: shopId});
            });
        }
    },

    'click .cancel': function(e) {
        e.preventDefault();

        Router.go('clerkList', {shopId: this.shopId});
    }
});
