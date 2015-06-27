describe('Formatter', function () {
    describe('money', function () {
        it('formats 14 to ￥14.0', function () {
            expect(Formatter.money(14)).toBe('￥14.0');
        });

        it('formats 14.5 to ￥14.5', function () {
            expect(Formatter.money(14.5)).toBe('￥14.5');
        });

        it('formats 14.59 to ￥14.6', function () {
            expect(Formatter.money(14.59)).toBe('￥14.6');
        });

        it('formats 0 to empty', function () {
            expect(Formatter.money(0)).toBe('');
        });
    });
});
