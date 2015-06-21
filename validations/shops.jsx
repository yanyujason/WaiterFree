Validator('shopDetails', {
    name: new Validation('店铺名称').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    desc: new Validation('店铺描述').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    address: new Validation('店铺地址').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    tel: new Validation('联系电话').attachRule(Rule.be(String)).attachRule(Rule.notEmpty).attachRule(Rule.telephone),
    tags: new Validation('店铺类型').attachRule(Rule.be(Array))
});
