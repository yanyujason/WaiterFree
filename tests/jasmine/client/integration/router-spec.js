describe('/my-shops', function () {
    afterEach(function(done) {
        Meteor.logout(done);
    });

    describe('for the boss who have more than 1 shop', function () {
        beforeEach(function (done) {
            Meteor.loginWithPassword({email: 'bossHas2Shops@waiterfree.com'}, 'password', done);
        });
        beforeEach(function (done) {
            Router.go('/my-shops');
            Tracker.afterFlush(done);
        });
        beforeEach(waitForRouter);

        it('has "/my-shops" as path', function () {
            expect(Router.current().url).toEqual('/my-shops')
        });

        it('shows shop list', function () {
            var shopList = $('.shop-name');
            expect(shopList.length).toBe(2);
            expect(shopList.first()).toHaveText('Dubai Asia');
            expect(shopList.last()).toHaveText('Software Park Star');
        });
    });

    describe('for the boss who have only 1 shop', function () {
        beforeEach(function (done) {
            Meteor.loginWithPassword({email: 'bossHas1Shop@waiterfree.com'}, 'password', done);
        });
        beforeEach(function (done) {
            Router.go('/my-shops');
            Tracker.afterFlush(done);
        });
        beforeEach(waitForRouter);

        it('redirects to "/myShop/:shopId"', function () {
            var shopId = Shops.findOne()._id;
            expect(Router.current().url).toEqual('/my-shops/' + shopId)
        });
    });

    describe('for the boss not sign in', function () {
        beforeEach(function (done) {
            Router.go('/my-shops');
            Tracker.afterFlush(done);
        });
        beforeEach(waitForRouter);

        it('redirects to "/sign-in"', function () {
            expect(Router.current().url).toEqual('/sign-in')
        });
    });
});
