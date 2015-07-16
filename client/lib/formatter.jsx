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
            m: '/w/330/h/220',
            s: '/w/100/h/70'
        };

        var config = QiniuConfig.findOne({name: 'qiniuConfig'});
        if(config) {
            var domain = config.domain;
            return `http://${domain}/${key}?imageView2/1${sizeMap[size]}/format/jpg/interlace/1`
        } else {
            return '/images/img-404.jpg';
        }
    }
};

Template.registerHelper('money', Formatter.money);
Template.registerHelper('imgPath', Formatter.imgPath);
