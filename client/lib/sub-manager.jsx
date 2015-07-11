Sub = new SubsManager();

Template.registerHelper('isReady', () => {
    Sub.dep.depend();
    return Sub.ready;
});
