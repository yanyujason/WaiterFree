function isNewClerk(clerkId) {
    return !clerkId;
}

Template.clerkForm.onCreated(function() {
    Sub.subscribe('myClerks', this.data.shopId);
});

Template.clerkForm.helpers({
    clerk() {
        return Meteor.users.findOne(this.clerkId);
    }
});

Template.clerkForm.helpers({
    title() {
        return isNewClerk(this.clerkId) ? '添加店员' : '修改店员';
    },
    submit() {
        return isNewClerk(this.clerkId) ? '添加' : '修改';
    }
});

Template.clerkForm.events({
    'submit .clerk-form': function(e) {
        e.preventDefault();

        var shopId = this.shopId;
        var clerkProfile = {
            number: $(e.target).find('[name=number]').val(),
            name: $(e.target).find('[name=name]').val(),
            password: $(e.target).find('[name=password]').val(),
            passwordConfirm: [$(e.target).find('[name=password]').val(), $(e.target).find('[name=password2]').val()]
        };

        var method = isNewClerk(this.clerkId) ? 'newClerk' : 'updateClerk';

        Meteor.call(method, shopId, this.clerkId, clerkProfile, function(error, result) {
            if (error) return throwError(error);
            Router.go('myShop', {shopId: shopId});
        });
    },

    'click .btn-cancel': function(e) {
        e.preventDefault();

        Router.go('myShop', {shopId: this.shopId});
    }
});
