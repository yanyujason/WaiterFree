Formatter = {
    money(price) {
        return price ? `￥${price.toFixed(1)}` : '';
    }
};
