describe('dishCategoryMixin', function () {
    describe('helpers', function () {
        afterEach(function() {
            Session.set('dishCategory', null);
        });

        describe('categoryDishes', function () {
            var dishes = [{name:'A', tags:['A']}, {name:'B', tags:['B']}, {name:'AB', tags:['A','B']}];

            it('returns all dishes when current tag is not set', function () {
                Session.set('dishCategory', null);
                expect(callHelper(Template.dishList, 'categoryDishes', {}, [dishes])).toEqual(dishes);
            });

            it('returns dishes ["A", "AB"] when current tag is "A"', function () {
                Session.set('dishCategory', 'A');
                expect(callHelper(Template.dishList, 'categoryDishes', {}, [dishes])).toEqual(
                    [{name:'A', tags:['A']}, {name:'AB', tags:['A','B']}]
                );
            });

            it('returns dishes [] when current tag is out of scope', function () {
                Session.set('dishCategory', 'OutOfScope');
                expect(callHelper(Template.dishList, 'categoryDishes', {}, [dishes])).toEqual([]);
            });
        });

        describe('activeCategoryClass', function () {
            it('returns "active" class when tag is current tag', function () {
                Session.set('dishCategory', 'activeTag');
                expect(callHelper(Template.dishList, 'activeCategoryClass', {}, ['activeTag'])).toBe('active');
            });
            it('returns "" class when tag is not current tag', function () {
                Session.set('dishCategory', 'activeTag');
                expect(callHelper(Template.dishList, 'activeCategoryClass', {}, ['otherTag'])).toBe('');
            });
        });

        describe('getAllDishTags', function () {
            it('returns all tags of the dishes with priority', function () {
                var dishes = [{name:'A', tags:['A']}, {name:'B', tags:['B']}, {name:'AB', tags:['A','B']}],
                    originOrder = ['Tag1', 'B'];

                expect(callHelper(Template.dishList, 'getAllDishTags', {}, [dishes, originOrder])).toEqual(['Tag1', 'B', 'A']);
            });
        });
    });

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
