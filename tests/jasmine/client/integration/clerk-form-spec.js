describe('clerkForm', function () {
    describe('html', function () {
        describe('newClerk form', function () {
            beforeEach(function() {
                renderTemplate(Template.clerkForm, {clerk: {}});
            });

            it('renders newClerks title text for newClerk', function () {
                expect('.clerk-form h2').toHaveText('添加店员');
            });

            it('renders create submit text for newClerk', function () {
                expect('.clerk-form [type=submit]').toHaveAttr('value', '添加');
            });
        });

        describe('updateClerk form', function () {
            beforeEach(function() {
                renderTemplate(Template.clerkForm, {clerk: {_id: '1'}});
            });

            it('renders updateClerk title text for updateClerk', function () {
                expect('.clerk-form h2').toHaveText('修改店员');
            });

            it('renders update submit text for updateClerk', function () {
                expect('.clerk-form [type=submit]').toHaveAttr('value', '修改');
            });
        });
    });

    describe('helpers', function () {
        describe('newClerk form', function () {
            it('returns newClerks for newClerk', function () {
                expect(callHelper(Template.clerkForm, 'title', {clerk: {}})).toBe('添加店员');
            });
            it('returns new for newClerk', function () {
                expect(callHelper(Template.clerkForm, 'submit', {clerk: {}})).toBe('添加');
            });
        });

        describe('updateClerk form', function () {
            it('returns updateClerks for updateClerk', function () {
                expect(callHelper(Template.clerkForm, 'title', {clerk: {_id: '1'}})).toBe('修改店员');
            });
            it('returns update for updateClerk', function () {
                expect(callHelper(Template.clerkForm, 'submit', {clerk: {_id: '1'}})).toBe('修改');
            });
        });
    });

    describe('events', function () {
        describe('newClerk form', function () {
            beforeEach(function() {
                renderTemplate(Template.clerkForm, {clerk: {}, shopId: 'shopId'});
            });

            it('creates new clerk when submit form', function () {
                spyOn(Meteor, 'call');

                $('.clerk-form input[name=name]').val('Name');
                $('.clerk-form input[name=email]').val('Email@wf.com');
                $('.clerk-form input[name=password]').val('Password1');
                $('.clerk-form input[name=password2]').val('Password1');
                $('.clerk-form').submit();

                expect(Meteor.call).toHaveBeenCalledWith('newClerk', 'shopId', undefined, {
                    name: 'Name', email: 'Email@wf.com', password: 'Password1', passwordConfirm: ['Password1', 'Password1']
                }, jasmine.any(Function));
            });

            it('redirects to clerkList after success', function () {
                spyOn(Meteor, 'call');
                spyOn(Router, 'go');

                $('.clerk-form').submit();
                Meteor.call.calls.mostRecent().args[4]();

                expect(Router.go).toHaveBeenCalledWith('clerkList', {shopId: 'shopId'});
            });
        });

        describe('updateClerk form', function () {
            beforeEach(function() {
                renderTemplate(Template.clerkForm, {clerk: {_id: '1'}, shopId: 'shopId'});
            });

            it('updates clerk when submit form', function () {
                spyOn(Meteor, 'call');

                $('.clerk-form input[name=name]').val('Name');
                $('.clerk-form input[name=email]').val('Email@wf.com');
                $('.clerk-form input[name=password]').val('Password1');
                $('.clerk-form input[name=password2]').val('Password1');
                $('.clerk-form').submit();

                expect(Meteor.call).toHaveBeenCalledWith('updateClerk', 'shopId', "1", {
                    name: 'Name', email: 'Email@wf.com', password: 'Password1', passwordConfirm: ['Password1', 'Password1']
                }, jasmine.any(Function));
            });

            it('redirects to clerkList after success', function () {
                spyOn(Meteor, 'call');
                spyOn(Router, 'go');

                $('.clerk-form').submit();
                Meteor.call.calls.mostRecent().args[4]();

                expect(Router.go).toHaveBeenCalledWith('clerkList', {shopId: 'shopId'});
            });
        });

        it('goes back to clerkList when click .cancel', function () {
            renderTemplate(Template.clerkForm, {clerk: {}, shopId: 'shopId'});
            spyOn(Router, 'go');
            $('.cancel').click();
            expect(Router.go).toHaveBeenCalledWith('clerkList', {shopId: 'shopId'});
        });
    });
});
