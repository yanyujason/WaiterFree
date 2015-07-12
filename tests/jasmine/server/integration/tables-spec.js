describe('table collection methods', function () {
  var myShopId;
  beforeEach(function () {
    myShopId = Shops.insert({tables: [{tableId: '1', name: 'table1'}, {tableId: '2', name: 'table2'}]});
    spyOn(Meteor, 'user').and.returnValue({_id: 'bossId', profile: {shops: [myShopId]}});
    spyOn(Meteor, 'userId').and.returnValue('bossId');
  });

  describe('newTable', function () {
    it('gets error when user is not owner', function (done) {
      var table = {name: 'new table'};

      var notMyShopId = 'notMyShopId';
      Meteor.call('newTable', notMyShopId, table, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('gets error when table exists', function (done) {
      var table = {name: 'table2'};

      Meteor.call('newTable', myShopId, table, function (err) {
        expect(err.error).toBe('validation-rule');
        done();
      });
    });

    it('creates new table for the shop', function (done) {
      var table = {name: 'new table'};
      Meteor.call('newTable', myShopId, table, function (e) {
        var tables = Shops.findOne({_id: myShopId}).tables;
        expect(tables.map(function(t){return t.name;})).toEqual(['table1', 'table2', 'new table']);
        done();
      });
    });

  });

  describe('deleteTable', function () {
    it('delete table', function (done) {
      Meteor.call('deleteTable', myShopId, '1', function () {
        expect(Shops.findOne({_id: myShopId}).tables.map(function(t){return t.name})).toEqual(['table2']);
        done();
      });
    });
  });
});
