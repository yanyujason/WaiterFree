Validator('shopDetails', {
    name: new Validation('店铺名称').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    desc: new Validation('店铺描述').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    address: new Validation('店铺地址').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    tel: new Validation('联系电话').attachRule(Rule.be(String)).attachRule(Rule.notEmpty).attachRule(Rule.telephone),
    tags: new Validation('店铺类型').attachRule(Rule.be([String]))
});

Validator('dish', {
    name: new Validation('菜品名称').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    img: new Validation('图片').attachRule(Rule.be(String)),
    price: new Validation('价格').attachRule(Rule.be(Number)).attachRule(Rule.positiveNumber),
    desc: new Validation('简介').attachRule(Rule.be(String)),
    tags: new Validation('类型').attachRule(Rule.be([String]))
});
