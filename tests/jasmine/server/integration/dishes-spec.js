describe('dishes collection methods', function () {
  var myShopId;
  beforeEach(function () {
    myShopId = Shops.insert({clerks: []});
    spyOn(Meteor, 'user').and.returnValue({_id: 'bossId', profile: {shops: [myShopId]}});
    spyOn(Meteor, 'userId').and.returnValue('bossId');
  });

  describe('newDish', function () {
    it('gets error when dish validation fails', function (done) {
      var dish = {
        name: '',
        img: '',
        desc: '',
        price: -10,
        tags: "wrong tag type",
        options: []
      };
      Meteor.call('newDish', myShopId, dish, function (err) {
        expect(err.error).toBe('validation-scenario-dish');
        expect(err.details[0].field).toBe('name');
        expect(err.details[1].field).toBe('price');
        expect(err.details[2].field).toBe('tags');
        done();
      });
    });

    it('gets error when user is not owner', function (done) {
      var dish = {
        name: 'dish name',
        img: '',
        desc: 'dish desc',
        price: 100,
        tags: ['tag1', 'tag2'],
        options: []
      };

      var notMyShopId = 'notMyShopId';
      Meteor.call('newDish', notMyShopId, dish, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('gets error when dish number exist', function (done) {
      spyOn(Shops, 'find').and.returnValue({
        count: function () {
          return 1;
        }
      });

      var dish = {
        name: 'dish name',
        img: '',
        desc: 'dish desc',
        price: 100,
        tags: ['tag1', 'tag2'],
        options: []
      };

      var notMyShopId = 'notMyShopId';
      Meteor.call('newDish', notMyShopId, dish, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('creates new dish for the shop', function (done) {
      var dish = {
        name: 'dish name',
        img: '',
        desc: 'dish desc',
        price: 100,
        tags: ['tag1', 'tag2'],
        options: []
      };
      Meteor.call('newDish', myShopId, dish, function (e) {
        var newDish = Shops.findOne({_id: myShopId, 'menu.dishes.name': 'dish name'}).menu.dishes[0];

        expect(newDish.price).toBe(100);
        expect(newDish.desc).toBe('dish desc');
        expect(newDish.tags[0]).toBe('tag1');
        expect(newDish.tags[1]).toBe('tag2');

        done();
      });
    });

  });

  describe('deleteDish', function () {
    var dishId;

    beforeEach(function() {
      Meteor.call('newDish', myShopId, {
        name: 'dish name',
        img: '',
        desc: 'dish desc',
        price: 100,
        tags: ['tag1', 'tag2'],
        options: []
      });

      dishId = Shops.findOne({_id: myShopId, 'menu.dishes.name': 'dish name'}).menu.dishes[0].dishId;
    });

    it('delete dish', function (done) {
      Meteor.call('deleteDish', myShopId, dishId, function () {
        expect(Shops.findOne({_id: myShopId, 'menu.dishes.dishId': dishId})).toBeUndefined();
        done();
      });
    });
  });

  describe('dishDetailsUpdate', function () {
    var dishId;
    beforeEach(function() {
      Meteor.call('newDish', myShopId, {
        name: 'dish name',
        img: '',
        desc: 'dish desc',
        price: 100,
        tags: ['tag1', 'tag2'],
        options: []
      });

      dishId = Shops.findOne({_id: myShopId, 'menu.dishes.name': 'dish name'}).menu.dishes[0].dishId;
    });

    it('gets error when dish validation fails', function (done) {
      var dish = {
        name: '',
        img: '',
        desc: '',
        price: -10,
        tags: "wrong tag type",
        options: []
      };
      Meteor.call('dishDetailsUpdate', myShopId, dish, function (err) {
        expect(err.error).toBe('validation-scenario-dish');
        expect(err.details[0].field).toBe('name');
        expect(err.details[1].field).toBe('price');
        expect(err.details[2].field).toBe('tags');
        done();
      });
    });

    it('gets error when user is not owner', function (done) {
      var dish = {
        name: 'dish name',
        img: '',
        desc: 'dish desc',
        price: 100,
        tags: ['tag1', 'tag2'],
        options: []
      };

      var notMyShopId = 'notMyShopId';
      Meteor.call('dishDetailsUpdate', notMyShopId, dish, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('update the dish details', function(done) {
      var updatedDish = {
        name: 'new dish name',
        img: '',
        desc: 'new dish desc',
        price: 500,
        tags: ['newTag1', 'tag2'],
        options: [],
        dishId: dishId
      };

      Meteor.call('dishDetailsUpdate', myShopId, updatedDish, function() {
        var updatedDetails = Shops.findOne({_id: myShopId, 'menu.dishes.dishId': dishId}).menu.dishes[0];

        expect(updatedDetails.name).toBe('new dish name');
        expect(updatedDetails.desc).toBe('new dish desc');
        expect(updatedDetails.price).toBe(500);
        expect(updatedDetails.tags[0]).toBe('newTag1');

        done();
      });
    });
  });
});