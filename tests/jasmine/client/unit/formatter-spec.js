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

    describe('imgPath', function () {
        it('formats a.jpg to "http://domain.com/a.jpg?imageView2/1/w/330/h/220/format/jpg/interlace/1" if domain exist', function () {
            spyOn(QiniuConfig, 'findOne').and.returnValue({domain: 'domain.com'});
            expect(Formatter.imgPath('a.jpg')).toBe('http://domain.com/a.jpg?imageView2/1/w/330/h/220/format/jpg/interlace/1');
        });

        it('formats a.jpg to "/images/img-404.jpg" if domain does not exist', function () {
            spyOn(QiniuConfig, 'findOne').and.returnValue(null);
            expect(Formatter.imgPath('a.jpg')).toBe('/images/img-404.jpg');
        });

        it('formats empty string to "" if domain does not exist', function () {
            expect(Formatter.imgPath('')).toBe('');
        });
    });
});
