describe('myShop', function () {
    describe('helpers', function () {
        afterEach(function() {
            Session.set('dishCategory', null);
        });

        describe('categoryDishes', function () {
            var dishes = [{name:'A', tags:['A']}, {name:'B', tags:['B']}, {name:'AB', tags:['A','B']}];

            it('returns all dishes when current tag is not set', function () {
                Session.set('dishCategory', null);
                expect(callHelper(Template.myShop, 'categoryDishes', {}, [dishes])).toEqual(dishes);
            });

            it('returns dishes ["A", "AB"] when current tag is "A"', function () {
                Session.set('dishCategory', 'A');
                expect(callHelper(Template.myShop, 'categoryDishes', {}, [dishes])).toEqual(
                    [{name:'A', tags:['A']}, {name:'AB', tags:['A','B']}]
                );
            });

            it('returns dishes [] when current tag is out of scope', function () {
                Session.set('dishCategory', 'OutOfScope');
                expect(callHelper(Template.myShop, 'categoryDishes', {}, [dishes])).toEqual([]);
            });
        });

        describe('activeCategoryClass', function () {
            it('returns "active" class when tag is current tag', function () {
                Session.set('dishCategory', 'activeTag');
                expect(callHelper(Template.myShop, 'activeCategoryClass', {}, ['activeTag'])).toBe('active');
            });
            it('returns "" class when tag is not current tag', function () {
                Session.set('dishCategory', 'activeTag');
                expect(callHelper(Template.myShop, 'activeCategoryClass', {}, ['otherTag'])).toBe('');
            });
        });
    });

    describe('events', function () {
        beforeEach(function() {
            renderTemplate(Template.myShop, {menu: {dishes: [], tagPriority: ['a', 'b']}});
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
