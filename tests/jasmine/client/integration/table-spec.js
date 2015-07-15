describe('myTables', function () {
  describe('html', function () {
    describe('my tables', function () {
      beforeEach(function () {
        renderTemplate(Template.myTables);
      });

      it('renders new table button for creating new table', function () {
        expect('a.new-table').toHaveText('添加桌台');
      });
    });
  });

  describe('events', function () {
    beforeEach(function(){
      spyOn(Shops, 'findOne').and.returnValue({_id: 'shopId', tables: [{'tableId': 1, 'name': 'table1'}, {'tableId': 2, 'name': 'table2'}]});
      renderTemplate(Template.myTables, {shopId: 'shopId'});
    });

    it('show delete confirm popup when click delete table', function () {
      spyOn(Popups, 'confirm');

      $('li:last-child .delete-table').click();

      expect(Popups.confirm).toHaveBeenCalled();
    });

    it('delete table when click delete table and confirm', function () {
      spyOn(Popups, 'confirm');
      spyOn(Meteor, 'call');

      $('li:last-child .delete-table').click();

      Popups.confirm.calls.mostRecent().args[1](true);

      expect(Meteor.call).toHaveBeenCalledWith('deleteTable', 'shopId', 2, jasmine.any(Function));
    })
  });
});
