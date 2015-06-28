Formatter = {
    money(price) {
        return price ? `￥${price.toFixed(1)}` : '';
    },
    imgPath(key) {
        var config = QiniuConfig.findOne({name: 'qiniuConfig'});
        if(config) {
            var domain = config.domain;
            return `http://${domain}/${key}?imageView2/1/w/330/h/220/format/jpg/interlace/1`
        } else {
            return '/images/img-404.jpg';
        }
    }
};
