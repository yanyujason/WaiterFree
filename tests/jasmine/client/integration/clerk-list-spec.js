describe('clerkList', function () {
    describe('html', function () {
        beforeEach(function() {
            spyOn(Meteor.users, 'find').and.returnValue([{profile: {name: 'Jennifer Lawrence'}}, {profile: {name: 'Tom Cruise'}}]);
            renderTemplate(Template.clerkList);
        });

        it('lists all clerks', function () {
            var clerkList = $('.clerk-list');
            expect(clerkList.text()).toContain('Jennifer Lawrence');
            expect(clerkList.text()).toContain('Tom Cruise');
        });
    });

    describe('events', function () {
        beforeEach(function() {
            spyOn(Meteor.users, 'find').and.returnValue([{_id:'1', profile: {name: 'Jennifer Lawrence'}}, {_id:'2', profile: {name: 'Tom Cruise'}}]);
            renderTemplate(Template.clerkList, {shopId: 'shop'});
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
            Popups.confirm.calls.mostRecent().args[1](true);

            expect(Meteor.call).toHaveBeenCalledWith('deleteClerk', 'shop', '2', jasmine.any(Function));
        });
    });
});
