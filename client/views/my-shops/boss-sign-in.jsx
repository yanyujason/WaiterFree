Template.bossSignIn.events({
    'submit form.boss-sign-in': function(e) {
        e.preventDefault();
        var boss = {
            email: $(e.target).find('[name=email]').val(),
            password: $(e.target).find('[name=password]').val()
        };

        Meteor.loginWithPassword({email: boss.email}, boss.password, function(e) {
            if(e) return throwError(e);
            Router.go('myShops');
        });
    }
});
