describe('shopInfoHeader', function () {
    describe('helpers', function () {
        it('returns current table name', function () {
            spyOn(Shops, 'findOne').and.returnValue({name: 'SHOP', tables: [{tableId: 't1', name: 'Table'}]});

            expect(callHelper(Template.shopInfoHeader, 'tableName', {tableId: 't1'})).toBe('Table');
        });
    });
});
