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

        it('formats 0 to ￥0.0', function () {
            expect(Formatter.money(0)).toBe('￥0.0');
        });

        it('formats false to empty', function () {
            expect(Formatter.money(false)).toBe('');
        });
    });

    describe('imgPath', function () {
        it('formats a.jpg l size to "http://domain.com/a.jpg?imageView2/1/w/330/h/220/format/jpg/interlace/1" if domain exist', function () {
            spyOn(QiniuConfig, 'findOne').and.returnValue({domain: 'domain.com'});
            expect(Formatter.imgPath('a.jpg', 'l')).toBe('http://domain.com/a.jpg?imageView2/1/w/330/h/220/format/jpg/interlace/1');
        });

        it('formats a.jpg m size to "http://domain.com/a.jpg?imageView2/1/w/220/h/150/format/jpg/interlace/1" if domain exist', function () {
            spyOn(QiniuConfig, 'findOne').and.returnValue({domain: 'domain.com'});
            expect(Formatter.imgPath('a.jpg', 'm')).toBe('http://domain.com/a.jpg?imageView2/1/w/220/h/150/format/jpg/interlace/1');
        });

        it('formats a.jpg s size to "http://domain.com/a.jpg?imageView2/1/w/100/h/70/format/jpg/interlace/1" if domain exist', function () {
            spyOn(QiniuConfig, 'findOne').and.returnValue({domain: 'domain.com'});
            expect(Formatter.imgPath('a.jpg', 's')).toBe('http://domain.com/a.jpg?imageView2/1/w/100/h/70/format/jpg/interlace/1');
        });

        it('formats a.jpg to "/images/img-404.jpg" if domain does not exist', function () {
            spyOn(QiniuConfig, 'findOne').and.returnValue(null);
            expect(Formatter.imgPath('a.jpg')).toBe('/images/img-404.jpg');
        });

        it('formats empty string to "" if domain does not exist', function () {
            expect(Formatter.imgPath('')).toBe('');
        });
    });

    describe('imgWithDefaultPath', function () {
        it('formats empty to default img path', function () {
            expect(Formatter.imgWithDefaultPath('')).toBe('/images/default-dish-img.png');
        });
    });
});
