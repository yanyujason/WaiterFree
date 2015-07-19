Formatter = {
    money(price) {
        if(typeof price === 'number') {
            return `￥${price.toFixed(1)}`;
        }
        return '';
    },
    imgPath(key, size='m') {
        if(!key) return '';
        var sizeMap = {
            l: '/w/310/h/220',
            m: '/w/200/h/140',
            s: '/w/100/h/70'
        };

        var config = QiniuConfig.findOne({name: 'qiniuConfig'});
        if(config) {
            var domain = config.domain;
            return `http://${domain}/${key}?imageView2/1${sizeMap[size]}/format/jpg/interlace/1`
        } else {
            return '/images/img-404.jpg';
        }
    },
    imgWithDefaultPath(key, size='m') {
        if(!key) return '/images/default-dish-img.png';
        return Formatter.imgPath(key, size);
    }

};

Template.registerHelper('money', Formatter.money);
Template.registerHelper('imgPath', Formatter.imgPath);
Template.registerHelper('imgWithDefaultPath', Formatter.imgWithDefaultPath);
