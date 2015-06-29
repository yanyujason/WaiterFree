Validator('clerkProfile', {
    name: new Validation('员工姓名').attachRule(Rule.be(String)).attachRule(Rule.notEmpty),
    email: new Validation('员工姓名').attachRule(Rule.be(String)).attachRule(Rule.notEmpty).attachRule(Rule.email),
    password: new Validation('密码').attachRule(Rule.be(String)).attachRule(Rule.notEmpty).attachRule(Rule.password),
    passwordConfirm: new Validation('密码').attachRule(Rule.be([String])).attachRule(Rule.notEmptyArray).attachRule(Rule.passwordConfirm)
});
