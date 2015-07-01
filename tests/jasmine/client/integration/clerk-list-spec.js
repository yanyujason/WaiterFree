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
});
