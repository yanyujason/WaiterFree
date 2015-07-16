describe('dishList', function () {
    describe('events', function () {
        beforeEach(function() {
            spyOn(Shops, 'findOne').and.returnValue({menu: {dishes: [], tagPriority: ['a', 'b']}});
            renderTemplate(Template.dishList);
        });

        it('changes active category when click on category', function (done) {
            $('.category[data-category=b]').click();

            Tracker.afterFlush(function() {
                expect(Session.get('dishCategory')).toBe('b');
                expect($('.category[data-category=b]')).toHaveClass('active');
                done();
            });
        });
    });
});
