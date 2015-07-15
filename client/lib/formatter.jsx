Formatter = {
    money(price) {
        if(typeof price === 'number') {
            return `￥${price.toFixed(1)}`;
        }
        return '';
    },
    imgPath(key) {
        if(!key) return '';
        var config = QiniuConfig.findOne({name: 'qiniuConfig'});
        if(config) {
            var domain = config.domain;
            return `http://${domain}/${key}?imageView2/1/w/330/h/220/format/jpg/interlace/1`
        } else {
            return '/images/img-404.jpg';
        }
    }
};

Template.registerHelper('money', Formatter.money);
Template.registerHelper('imgPath', Formatter.imgPath);
