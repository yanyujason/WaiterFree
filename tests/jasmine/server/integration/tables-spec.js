describe('dishes collection methods', function () {
  var myShopId;
  beforeEach(function () {
    myShopId = Shops.insert({tables: ["table1", "table2"], clerks: []});
    spyOn(Meteor, 'user').and.returnValue({_id: 'bossId', profile: {shops: [myShopId]}});
    spyOn(Meteor, 'userId').and.returnValue('bossId');
  });

  describe('newTable', function () {
    it('gets error when user is not owner', function (done) {
      var table = 'new table';

      var notMyShopId = 'notMyShopId';
      Meteor.call('newTable', notMyShopId, table, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('gets error when table exists', function (done) {
      var table = "table2";

      Meteor.call('newTable', myShopId, table, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('creates new table for the shop', function (done) {
      var table = "new table";
      Meteor.call('newTable', myShopId, table, function (e) {
        var tables = Shops.findOne({_id: myShopId}).tables;
        expect(tables).toEqual(['table1', 'table2', 'new table']);
        done();
      });
    });

  });

  describe('deleteTable', function () {
    beforeEach(function() {
      Meteor.call('newTable', myShopId, 'my new table');
    });

    it('delete table', function (done) {
      Meteor.call('deleteTable', myShopId, 'my new table', function () {
        expect(Shops.findOne({_id: myShopId}).tables).toEqual(['table1', 'table2']);
        done();
      });
    });
  });
});
