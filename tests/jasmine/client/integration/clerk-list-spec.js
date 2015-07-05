describe('clerkList', function () {
    describe('html', function () {
        beforeEach(function() {
            renderTemplate(Template.clerkList, {clerks: [{profile: {name: 'Jennifer Lawrence'}}, {profile: {name: 'Tom Cruise'}}]});
        });

        it('lists all clerks', function () {
            var clerkList = $('.clerk-list');
            expect(clerkList.text()).toContain('Jennifer Lawrence');
            expect(clerkList.text()).toContain('Tom Cruise');
        });
    });

    describe('events', function () {
        beforeEach(function() {
            renderTemplate(Template.clerkList, {shopId: 'shop', clerks: [{_id:'1', profile: {name: 'Jennifer Lawrence'}}, {_id:'2', profile: {name: 'Tom Cruise'}}]});
        });

        it('shows delete clerk popup when click .delete-clerk', function () {
            spyOn(Popups, 'confirm');
            $('.clerk-list li:last-child .delete-clerk').click();

            expect(Popups.confirm).toHaveBeenCalled();
        });

        it('deletes clerk when click .delete-clerk', function () {
            spyOn(Popups, 'confirm');
            spyOn(Meteor, 'call');
            $('.clerk-list li:last-child .delete-clerk').click();
            console.log(Popups.confirm.calls.mostRecent());
            Popups.confirm.calls.mostRecent().args[1](true);

            expect(Meteor.call).toHaveBeenCalledWith('deleteClerk', 'shop', '2', jasmine.any(Function));
        });
    });
});
